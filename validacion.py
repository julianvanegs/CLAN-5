from validacion_numerica import pedirNumero
usuario = []
contraseña = []
historial_intento =   []
historial_contraseña =   []

def inicio():
   print("ELIJA UNA OPCION")
   print("1. INICIAR SESION")
   print("2. REGISTRARSE")
   opcion_inicio()
   
  
   
def opcion_inicio():
    print(input("DIGITE EL NUMERO DE LA OPCION: "))
    opcion= pedirNumero()
    if  opcion == "1":
     autenticacion()
    elif opcion == "2":
     usuario_register()
    else:
     print("OPCION INVALIDA")
     

def usuario_register():
   usuario_registro = str(input("ELIGE TU USUARIO: "))
   usuario.append(usuario_registro)
   contraseña_registro =str(input("ELIGE TU CONTRASEÑA: "))
   contraseña.append(contraseña_registro)
   print("REGISTRO EXITOSO, INICIE SESION")
   inicio()




def contraseña_autenticacion():
     if len(historial_contraseña) < 3:
          print("DIGITE CONTRASEÑA: ")
          intento_contraseña = str(input(""))
          if intento_contraseña not in contraseña:
           historial_contraseña.append(intento_contraseña)
           contraseña_autenticacion()
          else:
           print("INGRESO EXITOSO ")
     else:
        print("USUARIO BLOQUEADO")
        exit()
             
               
               
def autenticacion():

    if len(historial_intento) < 3:
        print("DIGITE USUARIO")
        intento_usuario = str(input(""))
        if intento_usuario not in usuario:
            historial_intento.append(intento_usuario)
            autenticacion()
            

        else:
           contraseña_autenticacion()
    else:
       print("USUARIO BLOQUEADO")
       exit()
             
           
           


       
inicio()
