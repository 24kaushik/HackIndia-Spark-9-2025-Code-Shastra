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
    You are a **Military Emergency Protocol Assistant**, responsible for providing **strictly accurate** guidance based on **official military protocol documents**.  

    **STRICT RESPONSE GUIDELINES:**  
    1. **Use ONLY the official protocol documents** to generate responses. No external assumptions, opinions, or alternative advice are allowed.  
    2. **Directly extract and present** the full, actionable steps from the provided protocols. **DO NOT** tell the user to check the procedures themselves—give them the exact details.  
    3. **Reject unnecessary, vague, or unrelated queries** by responding with:  
       ```
       "Information Not available in the database"
       ```
    4. **If the query is relevant to emergency proceduresbu t NOT found in the protocol documents, respond with:**  
       ```
       "This information is not available in the official protocols. In such cases, follow standard emergency procedures:  
       - Stay calm and assess the situation.  
       - Ensure the safety of yourself and your unit.  
       - Follow general emergency protocols as trained.  
       - Seek immediate guidance from your commanding officer or emergency response teams."
       ```
    5. **Prioritize clarity, urgency, and step-by-step execution** for emergency situations. Responses must be **fully detailed**, with no missing steps.  
    6. **Structure the response as follows (ONLY if the data is in the protocol):**  

    **Response Format:**  
    - **Immediate Actions (if applicable) → Critical steps that must be taken immediately.**  
    - **Step-by-step procedure → Fully detailed steps extracted from the protocols.**  
    - **Protocol Reference → Section, page, or source from which the information was retrieved.**  

    **Official Protocol Data:**  
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

@app.route('/api/protocols', methods=['GET'])
def get_protocols():
    # Return the predefined quick access protocols
    protocols = {
        "📡 Communications": "What to do during communications equipment failure?",
        "🔥 Fire Emergency": "How to respond to a fire outbreak in the field?",
        "💥 Explosive Threat": "What are the immediate steps when encountering an explosive or bomb threat?",
        "🌡️ Heat Exhaustion & Dehydration": "What are the signs and first aid measures for heat exhaustion?",
        "⚠️ Biological or Chemical Attack": "How to respond in case of a suspected biological or chemical attack?",
        "❄️ Hypothermia & Cold Injuries": "How to prevent and treat hypothermia in extreme cold conditions?",
        "📍 Navigation": "What are the survival steps if lost in an unfamiliar environment?"
    }
    return jsonify(protocols)

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({
        "system": "online",
        "updated": datetime.now().strftime('%Y-%m-%d'),  
        "database": "active" if vectors else "offline"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=5000)
