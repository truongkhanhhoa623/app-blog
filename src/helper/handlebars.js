module.exports = { 
    sliceString: (string) => {
        if (string.length > 100) {
          return string.slice(0, 100);
        } 
        return string;
      },
      

}