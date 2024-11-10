export const server={
    url:'http://127.0.0.1:8000/api/v1/'
}
export function getIssFromSession(): string | null {
  return sessionStorage.getItem('idUsuario');
}


  