/*
 * @Descripttion: 
 * @Author: lgldlk
 * @Date: 2021-07-11 22:12:45
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-11 22:16:19
 */

import * as THREE from 'three'
export default function SpriteText(text, position, options) {

    if (typeof THREE === "undefined") {

        console.error('SpriteText: Please call SpriteText.setTHREE( THREE ) first.');
        return;

    }
    position = position || new THREE.Vector3(0, 0, 0);
    options = options || {};

    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({

        map: new THREE.Texture(),
        sizeAttenuation: options.sizeAttenuation !== undefined ? options.sizeAttenuation : false, //The size of the sprite is not attenuated by the camera depth. (Perspective camera only.)

    }));
    const canvas = document.createElement('canvas');
    sprite.material.map.minFilter = THREE.LinearFilter;
    const fontSize = 90;
    const context = canvas.getContext('2d');

    sprite.userData.update = function( /*optionsUpdate*/ ) {

        const optionsUpdate = {};
        if (sprite.parent)
            updateOptions(sprite.parent, optionsUpdate);
        else if (options.group)
            updateOptions(options.group, optionsUpdate);
        var textHeight = options.textHeight || optionsUpdate.textHeight || 0.04;
        const fov = options.fov || optionsUpdate.fov,
            sizeAttenuation = options.sizeAttenuation || optionsUpdate.sizeAttenuation || false,
            rotation = options.rotation || optionsUpdate.rotation || 0,
            fontFace = options.fontFace || optionsUpdate.fontFace || 'Arial',
            bold = options.bold || optionsUpdate.bold || false,
            italic = options.italic || optionsUpdate.italic || false,
            fontProperties = options.fontProperties || optionsUpdate.fontProperties || '',
            rect = options.rect || optionsUpdate.rect || {},
            color = 'rgba(255, 255, 255, 1)',
            fontColor = options.fontColor || optionsUpdate.fontColor || color,
            center = SpriteText.getCenter(options.center || optionsUpdate.center);

        if (fov !== undefined)
            textHeight = fov * textHeight / 50;

        rect.displayRect = rect.displayRect || false;
        const borderThickness = rect.borderThickness ? rect.borderThickness : 5,
            font = `${fontProperties}${bold ? 'bold ' : ''}${italic ? 'italic ' : ''}${fontSize}px ${fontFace}`;

        context.font = font;

        var width = 0,
            linesCount = 1,
            lines;
        if (typeof text === 'string') {

            linesCount = 0;
            lines = text.split(/\r\n|\r|\n/);
            lines.forEach(function(line) {

                var lineWidth = context.measureText(line).width;
                if (width < lineWidth)
                    width = lineWidth;
                linesCount += 1;

            });

        } else width = context.measureText(text).width;

        width += borderThickness * 2;

        const textWidth = width;
        canvas.width = textWidth;
        canvas.height = fontSize * linesCount + borderThickness * 2;

        context.font = font;

        //Rect
        //Thanks to http://stemkoski.github.io/Three.js/Sprite-Text-Labels.html
        if (rect.displayRect) {

            // background color
            context.fillStyle = rect.backgroundColor ? rect.backgroundColor : 'rgba(0, 0, 0, 1)';

            // border color
            context.strokeStyle = rect.borderColor ? rect.borderColor : fontColor;

            context.lineWidth = borderThickness;

            // function for drawing rounded rectangles
            function roundRect(ctx, x, y, w, h, r) {

                ctx.beginPath();
                ctx.moveTo(x + r, y);
                ctx.lineTo(x + w - r, y);
                ctx.quadraticCurveTo(x + w, y, x + w, y + r);
                ctx.lineTo(x + w, y + h - r);
                ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
                ctx.lineTo(x + r, y + h);
                ctx.quadraticCurveTo(x, y + h, x, y + h - r);
                ctx.lineTo(x, y + r);
                ctx.quadraticCurveTo(x, y, x + r, y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

            }
            roundRect(context,
                borderThickness / 2,
                borderThickness / 2,
                canvas.width - borderThickness,
                canvas.height - borderThickness,
                rect.borderRadius === undefined ? 0 : rect.borderRadius
            );

        }

        context.fillStyle = fontColor;
        context.textBaseline = 'bottom';
        if (linesCount > 1) {
            for (var i = 0; i < lines.length; i++) {

                const line = lines[i];
                context.fillText(line, borderThickness, canvas.height - ((lines.length - i - 1) * fontSize) - borderThickness);

            }

        } else context.fillText(text, borderThickness, canvas.height - borderThickness);

        // Inject canvas into sprite
        sprite.material.map.image = canvas;
        sprite.material.map.needsUpdate = true;

        const th = textHeight * linesCount; // * angleDistance;
        sprite.scale.set(th * canvas.width / canvas.height, th);
        sprite.position.copy(position);
        sprite.center = center;

        //size attenuation. Whether the size of the sprite is attenuated by the camera depth. (Perspective camera only.) Default is false.
        //See https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial.sizeAttenuation
        sprite.material.sizeAttenuation = sizeAttenuation;

        sprite.material.rotation = rotation;
        sprite.material.needsUpdate = true;

    };
    sprite.userData.update();

    sprite.userData.updateText = function(_text) {

        text = _text;
        const options = {}
        updateOptions(sprite.parent, options);
        sprite.userData.update(options);

    }
    if (options.group)
        options.group.add(sprite);

    sprite.userData.optionsSpriteText = options;

    return sprite;

};

/**
 * set THREE
 * @function SpriteText.
 * setTHREE
 * @param {THREE} THREE {@link https://github.com/anhr/three.js|THREE}
 */
SpriteText.setTHREE = function(_THREE) { THREE = _THREE; }

/**
 * get THREE
 * @function SpriteText.
 * getTHREE
 * @returns {@link https://github.com/anhr/three.js|THREE}
 */
SpriteText.getTHREE = function() {

    if (!THREE)
        console.error('Call SpriteText.setTHREE( THREE ) first.');
    return THREE;

}

/**
 * Returns {@link https://threejs.org/docs/index.html#api/en/objects/Sprite.center|center}
 * @function SpriteText.
 * getCenter
 * @param {THREE.Vector2} center
 * @returns center
 */
SpriteText.getCenter = function(center) {

    return center instanceof THREE.Vector2 ||
        ((typeof center === "object") && (center.x !== undefined) && (center.y !== undefined) //При копироваении и при чтении из cockie THREE.Vector2 превращается в Object{x: x, y: y}
        ) ? center :
        new THREE.Vector2(0, 1); //Default is left upper corner

}

function updateOptions(group, options) {

    if (group.userData.optionsSpriteText)
        Object.keys(group.userData.optionsSpriteText).forEach(function(key) {

            if (options[key] === undefined) //Child options have more priority before parent options
                options[key] = group.userData.optionsSpriteText[key];

        });
    while (group.parent) {

        group = group.parent;
        updateOptions(group, options);

    }

}

/**
 * Call SpriteText.updateSpriteTextGroup if you want to update of the options of all SpriteText, added in to group and all child groups
 * @function SpriteText.
 * updateSpriteTextGroup
 * @param {THREE.Group|THREE.Scene} group group or scene of SpriteText and of all child groups of SpriteText for which these settings will have an effect.
 * @example
<script>
	options = {
		textHeight: 0.1,
		sizeAttenuation: false,
	}
	const fSpriteTextAll = SpriteTextGui( gui, scene, {
		getLanguageCode: getLanguageCode,
		settings: { zoomMultiplier: 1.5, },
		options: options
	} );
	//Change of the text height
	options.textHeight = 0.2;
	//update of the options of all SpriteText, added in to group and all child groups
	SpriteText.updateSpriteTextGroup( group );
	//To do something...
	//Restore options.textHeight to 0.1
	fSpriteTextAll.userData.restore();
</script>
*/
SpriteText.updateSpriteTextGroup = function(group) {

    group.children.forEach(function(spriteItem) {

        if (spriteItem instanceof THREE.Sprite) {

            if (spriteItem.userData.update !== undefined)
                spriteItem.userData.update();

        } //else if ( spriteItem instanceof THREE.Group )
        SpriteText.updateSpriteTextGroup(spriteItem);

    });

}