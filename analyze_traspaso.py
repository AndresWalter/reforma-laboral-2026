import PyPDF2

pdf_path = 'public/reforma_2026_ocr.pdf'

def analyze_traspaso():
    try:
        with open(pdf_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            total_pages = len(reader.pages)
            print(f"Total pages: {total_pages}")
            
            # Start from page 119 (index 118) to end
            start_page = 118 
            
            print(f"\n--- Analyzing from Page {start_page + 1} to {total_pages} ---\n")

            full_text = ""
            for i in range(start_page, total_pages):
                page = reader.pages[i]
                text = page.extract_text()
                full_text += text + "\n"
                print(f"--- Page {i+1} ({len(text)} chars) ---")
                print(text[:200] + "...") # Preview

            # Simple keyword check
            keywords = ["Transferencia", "Ciudad Autónoma", "Justicia Nacional", "fueros", "jueces"]
            print("\n--- Keyword Analysis ---")
            for kw in keywords:
                count = full_text.count(kw)
                print(f"'{kw}': found {count} times")
                
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    analyze_traspaso()
