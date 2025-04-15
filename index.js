function getElementType(element){
    if (!element) return "unknown";
    const tag = element.tagName?.toUpperCase();
    switch (tag) {
      case "IMG":      return "image";
      case "A":        return "hyperlink";
      case "INPUT":    return element.type || "input";
      case "TEXTAREA": return "text";
      case "SELECT":   return "drop-down";
      case "BUTTON":   return "button";
      case "P":
      case "SPAN":
      case "DIV":      return "text";
      default:         return tag ? tag.toLowerCase() : "unknown";
    }
}
  
function logPageView(){
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, view, document`);
}
  
function logClickEvent(event){
    const timestamp = new Date().toISOString();
    const elementType = getElementType(event.target);
    console.log(`${timestamp}, click, ${elementType}`);
}
  
function setupEventLogging(){
    window.addEventListener("DOMContentLoaded", logPageView);
    document.addEventListener("click", logClickEvent);
}
  
setupEventLogging();
  