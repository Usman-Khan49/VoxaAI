// API Configuration
// IMPORTANT: Update this IP address to match your computer's IPv4 address
// To find your IP: run 'ipconfig' in Windows PowerShell and look for IPv4 Address

export const COMPUTER_IP = "10.218.198.149";
export const API_PORT = "3000";

// This gets automatically used by api.js and other components
export const getApiBaseUrl = () => {
  return `http://${COMPUTER_IP}:${API_PORT}`;
};
