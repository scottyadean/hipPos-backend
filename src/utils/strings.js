module.exports = {
    slug(value){
        return value
            .toString()
            .toLowerCase().replace(/ /g,'-')
            .replace(/[^\w-]+/g,'');
    },


    cents_to_dollars(amount){
        const num = parseInt(amount.toString().replace(/[^0-9]/gi, ''));
        if (  num <= 99  ){
          return `.${num}`;
        }
        return (num / 100).toLocaleString("en-US", {style:"currency", currency:"USD"});
      },


      dollars_to_cents(amount){
        return parseInt(amount.toString().replace(/[^0-9]/gi, ''));
      },

      code( prefix, count ) {
        return `${prefix}${count.toString().padStart(5, '0')}`; 
      },

      prefix(tag){
          let str = tag.toLowerCase().replace("and", "").replace("the", ""); 
          return str.match(/\b\w/g).join('')
      }
   
}