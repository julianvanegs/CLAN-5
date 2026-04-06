#List where values are saved
tasks = []
import csv
import os

def save_csv(tasks, path, include_header=True):
    if not tasks:
        print("Error: Inventory is empty. Nothing to save.")
        return

    try:
        with open(path, 'w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            if include_header:
                writer.writerow([ "id", "name", "description", "priority", "status"])
            
            for prod in tasks:
                writer.writerow([prod['id'],prod['name'], prod['description'], prod['priority'], prod['status']])
        
        print(f"Inventory successfully saved to: {path}!")
    except PermissionError:
        print(f"Error: You do not have permission to write to '{path}'.")
    except Exception as e:
        print(f"An unexpected error occurred while saving: {e}")


#validation of values for only integer number
def get_number():
    while True:
        try:
            number = int(input())
            return number
        except ValueError:
            print("Please enter a valid number.")
            
#menu frontend
def menu():
    print("MENU")
    print("1. Add new task")
    print("2. Display tasks")
    print("3. Search task (name)")
    print("4. Update task")
    print("5. Delete task")
    print("6. Save CSV")
    print("7. Exit")



#function for add a new task
def add_new_task():
    print("TASK ID (ONLY NUMBERS)")
    id = get_number()
    print("TASK NAME: ")
    name = input()
    print("TASK DESCRIPTION")
    description = input()
    print("PRIORITY (HIGH, MEDIUM, LOW)")
    priority = input()
    print("STATUS (IN PROCESS/COMPLETE)")
    status = input()
    tasks.append({ "id": id ,"name": name, "description": description, "priority": priority, "status":status})
    print("Product added")

#function for show the added tasks
def task_list():
    if not tasks:
        print("Task list is empty")
        return
    for prod in tasks:
        print(f"ID: {prod['id']} | TASK NAME: {prod['name']} | DESCRIPTION: {prod['description']} | PRIORITY {prod['priority']} | STATUS: {prod['status']}")
#function for search task for name 
def search_task():
    if not tasks:
        print("Task list is empty")
        return
    for i, prod in enumerate(tasks):
        print(f"{i + 1}. {prod['name']}")
    print("Enter name task: ")
    busquedad = input()
    found = False
    for prod in tasks:
        
        if prod['name'].lower() == busquedad.lower():
            print(f"Found: {prod}")
            found = True
            break
    if not found:
        print("Product found.")
    

        
#function for update information of the product
def update():
    if not tasks:
        print("Task list is empty")
        return
    for i, prod in enumerate(tasks):
        print(f"{i + 1}. {prod['name']}")
    

    selection = int(get_number()) - 1
    
    if 0 <= selection < len(tasks):
        print(f"Editing: {tasks[selection]['name']}")
        
        print("New ID: ")
        new_id = get_number()
        if new_id:
            tasks[selection]['id'] = new_id
        else:
            print("ID no modificado")
        
        print("New name: ")
        new_name = input()
        if new_name:
            tasks[selection]['name'] = new_name
        
        print("New description: ")
        new_des = input()
        if new_des:
            tasks[selection]['description'] = new_des
        
        print("New priority: ")
        new_prio = input()
        if new_prio:
            tasks[selection]['priority'] = new_prio
        
        print("New status: ")
        new_est = input()
        if new_est:
            tasks[selection]['name'] = new_est
        
        if new_name:
            tasks[selection]['name'] = new_name
        print("Product update!")
    else:
        print("Invalid number.")
        
#function for delete a task with a pop
def delete_task():
    if not tasks:
        print("Task list is empty")
        return
    for i, prod in enumerate(tasks):
        print(f"{i + 1}. {prod['name']}")
    
    print("Select product number ")
    selection = int(get_number()) - 1
    
    if 0 <= selection < len(tasks):
        delete_task = tasks.pop(selection)
        print(f"Product'{delete_task['name']}' deleted")
    else:
        print("Invalid number")
#function of the general system by choose a option and each option have a function 
def run_system():
    option = ""
    while option != "8":
        menu()
        option = input("Select an option: ")
        if option == "1":
            add_new_task()
        elif option == "2":
            task_list()
        elif option == "3":
            search_task()
        elif option == "4":
            update()
        elif option == "5":
            delete_task()
        elif option == "6":

            save_csv(tasks, "data.csv")
        elif option == "7":      
            break


        else:
            print("Numero no valido")
            run_system()
            



run_system()