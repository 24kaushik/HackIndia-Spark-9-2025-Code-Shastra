from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import os

groq_api_key = os.getenv('GROQ_API_KEY')

def initialize_llm():
    return ChatGroq(
        groq_api_key=groq_api_key,
        model_name="llama-3.3-70b-specdec"
    )

def process_documents_background():
    try:
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        loader = PyPDFDirectoryLoader("./Data")
        docs = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=200)
        final_documents = text_splitter.split_documents(docs)
        return FAISS.from_documents(final_documents, embeddings)
    except Exception as e:
        raise Exception(f"Protocol database initialization error: {str(e)}")

def get_protocol_response(query, llm, vectors):
    # Your logic to process the query and return the response
    # You may use the chain and retrieval as needed
    # For example:
    document_chain = create_stuff_documents_chain(llm, initialize_prompt())
    retrieval_chain = create_retrieval_chain(vectors.as_retriever(), document_chain)
    response = retrieval_chain.invoke({'input': query})
    return response['answer']
