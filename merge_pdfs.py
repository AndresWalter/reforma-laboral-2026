import PyPDF2
import os

pdf_dir = 'public/reforma OCR_2026'
output_path = 'public/reforma_2026_ocr.pdf'

def merge_and_check():
    merger = PyPDF2.PdfMerger()
    
    # Archivos en orden manual o sort
    files = [
        'Texto Definitivo - -1-99.pdf',
        'Texto Definitivo - -100-132.pdf'
    ]
    
    for filename in files:
        filepath = os.path.join(pdf_dir, filename)
        if os.path.exists(filepath):
            print(f"Adding {filename}...")
            merger.append(filepath)
        else:
            print(f"Error: {filename} not found.")
            return

    merger.write(output_path)
    merger.close()
    print(f"Merged PDF created at {output_path}")

    # Search for specific terms
    search_terms = ['Artículo 91', 'Anexo I', 'Anexo 1', 'Colaboradores']
    
    try:
        with open(output_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            print(f"Total pages: {len(reader.pages)}")
            
            for i in range(len(reader.pages)):
                page = reader.pages[i]
                text = page.extract_text()
                
                for term in search_terms:
                    if term in text:
                        print(f"\n--- Found '{term}' on Page {i+1} ---")
                        # Print context around the term
                        index = text.find(term)
                        start = max(0, index - 200)
                        end = min(len(text), index + 1000)
                        print(text[start:end])
    except Exception as e:
        print(f"Error reading merged PDF: {e}")

if __name__ == "__main__":
    merge_and_check()
