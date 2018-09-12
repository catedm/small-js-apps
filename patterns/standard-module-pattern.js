// Standard Module Pattern
const UICtrl = (function() {
  let text = 'Hello world';

  const changeText = function() {
    const element = document.querySelector('h1');
    element.textContent = text;
  };

  return {
    callChangeText: function() {
      changeText();
      console.log(text);
    }
  };
})();

UICtrl.callChangeText();
