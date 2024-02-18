const toPascalCase = (str: string) : string  =>
  str
    .split(" ")
    .map((x) => {
      if (x.indexOf("<strong>") === 0) {
        return (
          "<strong>" + x.charAt(8).toUpperCase() + x.slice(9).toLowerCase()
        );
      } else {
        return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
      }
    })
    .join(" ");
    
export default toPascalCase;
