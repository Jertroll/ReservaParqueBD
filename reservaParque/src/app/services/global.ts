export const server={
    url:'http://127.0.0.1:8000/api/v1/'
}

export function getIssFromSession(): string {
    // Obtiene la cadena JSON almacenada en sessionStorage con la key 'identity'
    const identityString = sessionStorage.getItem('identity');
  
    if (identityString) {
      // Convierte la cadena JSON en un objeto
      const identity = JSON.parse(identityString);
      return identity.iss;
    } else {
      return '';
    }
  }
  