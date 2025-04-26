from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import time
from datetime import datetime
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Load environment variables
load_dotenv()
groq_api_key = os.getenv('GROQ_API_KEY')
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize LLM
def initialize_llm():
    return ChatGroq(
        groq_api_key=groq_api_key,
        model_name="llama-3.3-70b-versatile"
    )

# Initialize prompt template
def initialize_prompt():
    return ChatPromptTemplate.from_template("""
    You are **CampusCopilot**, an AI Companion for students, providing **strictly accurate and helpful information** based on **official college data sources** (like timetable, nearby restaurants, places to visit, etc.).

    **STRICT RESPONSE GUIDELINES:**  
    1. **Use ONLY the provided college data** to answer queries (e.g., timetables, college services, nearby places). No external assumptions or fabricated details are allowed.  
    2. **Directly extract and present** the relevant information. **DO NOT** tell the user to check the data themselves — provide the exact details they need.  
    3. **If a query is unrelated or the information is unavailable, respond with:**  
       ```
       "Information not available in the current database."
       ```
    4. **If the query is related to college life but the data is missing, respond with:**  
       ```
       "This information is currently not available. For assistance, please contact the college helpdesk or refer to official resources."
       ```
    5. **Prioritize helpfulness, clarity, and step-by-step guidance** where applicable. Responses must be **complete and easy to follow**.  
    6. **Structure the response clearly as follows (ONLY if data is available):**  

    **Response Format:**  
    - **Direct Answer → Provide the exact requested information.**  
    - **Additional Tips (if available) → Any extra relevant information from the database.**  
    - **Source Reference → Mention the source section or type (e.g., "Timetable Database", "Nearby Restaurants List").**

    **Official College Data Sources:**  
    {context}  

    **Query:** {input}
    """)


# Process documents and create vector store
vectors = None

def process_documents():
    global vectors
    try:
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        loader = PyPDFDirectoryLoader("./Data")
        docs = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=200)
        final_documents = text_splitter.split_documents(docs)
        vectors = FAISS.from_documents(final_documents, embeddings)
        return True
    except Exception as e:
        print(f"Protocol database initialization error: {str(e)}")
        return False

# Initialize documents at startup
if process_documents():
    print("Vector database initialized successfully")
else:
    print("Failed to initialize vector database")

@app.route('/api/query', methods=['POST'])
def process_query():
    global vectors
    if not vectors:
        return jsonify({"error": "Vector database not initialized"}), 500
    
    data = request.json
    query = data.get('query')
    
    if not query:
        return jsonify({"error": "No query provided"}), 400
    
    try:
        llm = initialize_llm()
        document_chain = create_stuff_documents_chain(llm, initialize_prompt())
        retrieval_chain = create_retrieval_chain(vectors.as_retriever(), document_chain)
        
        start_time = time.time()
        response = retrieval_chain.invoke({'input': query})
        processing_time = time.time() - start_time
        
        # Extract context information for references
        context_data = []
        for doc in response['context']:
            context_data.append({
                "page_content": doc.page_content,
                "metadata": doc.metadata
            })
        
        return jsonify({
            "answer": response['answer'],
            "processing_time": processing_time,
            "context": context_data
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({
        "system": "online",
        "updated": datetime.now().strftime('%Y-%m-%d'),  
        "database": "active" if vectors else "offline"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=5000)
