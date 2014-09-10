SALLFY JST
==========

JavaScript lite templater



Usage
-----

- Just include [jquery.jst.js] after jQuery. Requires jQuery 1.9+.
``` html
<script src='jquery.js'></script>
<script src='jquery.jst.js'></script>
```

- Set template folder and add templates data
``` html
<script>
tpl.dir='js/tpl/'; // set template folder
tpl.templates={
    one:'first',  // template named "one" and including first.jtpl file
}
</script>
```
_I recommend using a separate file for more order_

- Make template files - js/tpl/first.tpl
``` javascript
<div>%%_text_%%</div>
```

- Write where you want to add tag attribute "jtpl"
``` html
<div jtpl="body"></body>
```

- To connect the call the template
``` javascript
tpl.methods.change('body','one');
```


