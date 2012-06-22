//Base Class
function downloadFabric(elem,selector) {
	this.elem = elem;
	this.list = this.elem.querySelectorAll(selector);
	//making magic :)
	this.setLink = function(elem) {
		var elem = elem,
			inputelem = elem.querySelector('input'),
			newhref = inputelem.value.split(',')[0],
			newchild = document.createElement('a'),
			name = "",
			temp = elem.querySelector('b a'),
        	temp2;

		elem.className += ' shithappens';

		
        name += temp.text + ' - ';
        
        temp = elem.querySelector('b + span');
        name += temp.textContent;
        if (name.length > 251) {
            name = name.slice(0,250);
        }
		newchild.href = newhref;
		newchild.className = 'randomput';
		newchild.innerHTML = '<img src="'+chrome.extension.getURL("icons/download.png")+'" /> ';
		newchild.setAttribute('download',name);
        if (temp = elem.querySelector('td.play_btn')) {
            temp.appendChild(newchild);
        } else {
            elem.querySelector('.audio table td').appendChild(newchild);
        }
	}
	//DOMEvent Handler
	this.updateLinks = function() {
		this.elem.removeEventListener('DOMSubtreeModified',this.updateLinks,false);
		this.list = this.elem.querySelectorAll(selector);
		Array.prototype.forEach.call(this.list,this.setLink.bind(this));
		this.elem.addEventListener('DOMSubtreeModified', this.updateLinks,false);
	}.bind(this);
	//initialize
	this.updateLinks();
	this.elem.addEventListener('DOMSubtreeModified', this.updateLinks,false);
	/*
		DOMTree Events is realy cool, if u didn't know about them atm — find & read;
	*/
}
//App init
var abr = new downloadFabric(document,'.audio:not(#audio_global):not(.shithappens)');
