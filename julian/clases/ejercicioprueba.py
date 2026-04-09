class Libro:
    def __init__(self, titulo, autor):
        self.titulo = titulo
        self.autor = autor
        self.prestado = False
        
    def prestar(self):
        if not self.prestado:
            self.prestado = True 
            print("Se ha prestado el libro con exito ")
        else:
            print(f"el libro {self.titulo} ya esta prestado")
        
    
    def devolver(self):
        if self.prestado:
            self.prestado = False
            print(f"El libro {self.titulo} ha sido devuelto")
        else:
            print(f"El libro {self.titulo} ya habia sido devuelto ")
         
titulo = input("Ingrese el nombre del libro")
autor = input(f"Ingrese el autor del libro {titulo}")