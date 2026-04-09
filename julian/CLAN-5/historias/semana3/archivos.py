import csv
import os

def save_csv(inventory, path, include_header=True):
    if not inventory:
        print("Error: Inventory is empty. Nothing to save.")
        return

    try:
        with open(path, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            if include_header:
                writer.writerow(["name", "price", "quantity"])
            
            for prod in inventory:
                writer.writerow([prod['name'], prod['price'], prod['quantity']])
        
        print(f"Inventory successfully saved to: {path}!")
    except PermissionError:
        print(f"Error: You do not have permission to write to '{path}'.")
    except Exception as e:
        print(f"An unexpected error occurred while saving: {e}")

def load_csv(path):
    loaded_products = []
    errors = 0

    try:
        with open(path, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            header = next(reader, None) 

            # Validate header
            if header != ["name", "price", "quantity"]:
                print("Error: File header is invalid.")
                return None

            for row_num, row in enumerate(reader, start=2):
                try:
         
                    if len(row) != 3:
                        raise ValueError("Incorrect number of columns")

                    name = row[0].strip()
                    price = float(row[1])
                    quantity = int(row[2])

                    if price < 0 or quantity < 0:
                        raise ValueError("Negative values not allowed")

                    loaded_products.append({
                        "name": name,
                        "price": price,
                        "quantity": quantity
                    })
                except (ValueError, IndexError):
                    errors += 1
                    continue

        return loaded_products, errors

    except FileNotFoundError:
        print(f"Error: The file '{path}' does not exist.")
    except UnicodeDecodeError:
        print("Error: The file does not have the correct text format (UTF-8).")
    except Exception as e:
        print(f"General error: {e}")
    return None

def manage_load(current_inventory, file_path):
    result = load_csv(file_path)
    if not result: return
    
    new_prods, bad_rows = result
    
    option = input(f"{len(new_prods)} products found. Overwrite current inventory? (Y/N): ").upper()
    
    if option == 'Y':
        current_inventory.clear()
        current_inventory.extend(new_prods)
        action = "Full reset"
    else:
        # Policy: Sum quantities and update price to the most recent
        for new in new_prods:
            found = False
            for current in current_inventory:
                if current['name'].lower() == new['name'].lower():
                    current['quantity'] += new['quantity']
                    current['price'] = new['price']
                    found = True
                    break
            if not found:
                current_inventory.append(new)
        action = "Merge (quantities added, prices updated)"

    print(f"\n--- LOAD SUMMARY ---")
    print(f"Action performed: {action}")
    print(f"Products processed: {len(new_prods)}")
    print(f"Invalid rows skipped: {bad_rows}")
