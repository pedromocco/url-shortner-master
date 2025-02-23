# **sqrt (URL Shortner)**

## **Tabla de Contenidos**
1. [Introducción](#introducción)
2. [Características Principales](#características-principales)
4. [Uso](#uso)

---

## **Introducción**

URL Shortener es una aplicación práctica desarrollada como ejercicio para aprender los conceptos básicos del backend. La aplicación permite a los usuarios acortar URLs largas en enlaces más cortos y manejables. Además, redirige automáticamente a los usuarios al sitio original cuando acceden al enlace acortado.

Inicialmente, el proyecto fue desarrollado con **React** y **Node.js**, utilizando **PostgreSQL** como base de datos. Para su presentación como demostración, se migró a **Next.js** y se integró con **Supabase** para simplificar la gestión de la base de datos y mejorar la escalabilidad.

---

## **Características Principales**
- **Acortamiento de URLs**: Convierte URLs largas en enlaces cortos y fáciles de compartir.
- **Redirección Automática**: Los enlaces acortados redirigen automáticamente al sitio original.
- **Persistencia de Datos**: Las URLs acortadas se almacenan en la base de datos para garantizar que no se pierdan.
  

---
## **Uso**
La aplicación es muy sencilla de usar:
Acortar una URL :
1. Ingresa una URL larga en el campo de texto.
2. Haz clic en el botón "Acortar".
3. La aplicación generará un enlace corto que puedes copiar y compartir.
   
**Redirección** :

- Al acceder al enlace corto, serás redirigido automáticamente al sitio original.

**Historial de URLs** :

- Puedes ver un historial de las URLs acortadas.
