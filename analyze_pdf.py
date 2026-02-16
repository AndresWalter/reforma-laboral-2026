import PyPDF2

pdf_path = 'public/Texto Definitivo - reforma2026.pdf'

try:
    with open(pdf_path, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        print(f"Total pages: {len(reader.pages)}")
        
        # Leer primeras 10 páginas buscando índice o resumen
        for i in range(min(10, len(reader.pages))):
            page = reader.pages[i]
            text = page.extract_text()
            print(f"\n--- Page {i+1} ---\n{text[:1000]}") # Imprimir primeros 1000 caracteres
            
except Exception as e:
    print(f"Error: {e}")
