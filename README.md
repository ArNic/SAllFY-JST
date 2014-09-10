SALLFY JST
==========

JavaScript lite templater



Usage
-----

1. Just include [jquery.jst.js] after jQuery. Requires jQuery 1.9+.
``` html
<script src='jquery.js'></script>
<script src='jquery.jst.js'></script>
```

2. Set template folder and add templates data
``` html
<script>
tpl.dir='js/tpl/'; // set template folder
tpl.templates={
    one:'first',  // template named "one" and including first.jtpl file
}
</script>
```
_I recommend using a separate file for more order_

3. Make template files
- js/tpl/first.tpl
``` javascript
<div>%_text_%</div>
```

4. Write where you want to add tag attribute "jtpl"
``` html
<div jtpl="body"></body>
```

5.To connect the call the template
``` javascript
tpl.methods.change('body','logged');
```
