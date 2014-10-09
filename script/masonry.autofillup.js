/*!
 * AutoFillUp v.1.0.0
 * Masonry auto fill up gaps library
 * https://github.com/kzahirag/masonry.autofillup
 * MIT License
 * by kzahirag alias Klaus Zahiragic
 * - - - - - - - - - - - - - - - - - - - - 
 * Extension for Masonry by David DeSandro 
 * (http://masonry.desandro.com/)
 * - - - - - - - - - - - - - - - - - - - - 
 */

( function( window ) {

'use strict';

//for devolepment purpose only
var isDebugMode = false;

// -------------------------- helpers -------------------------- //

var indexOf = Array.prototype.indexOf ?
  function( items, value ) {
    return items.indexOf( value );
  } :
  function ( items, value ) {
    for ( var i=0, len = items.length; i < len; i++ ) {
      var item = items[i];
      if ( item === value ) {
        return i;
      }
    }
    return -1;
  };

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// -------------------------- contants -------------------------- //
var oldMatrix, tmpMatrix = [];
var DUMMY = "dummy";

function autoFillUpDefinition( Outlayer, getSize ) {
	
	//MAIN
	var AutoFillUp = Outlayer.create('autofillup'); 
	extend( AutoFillUp.prototype, Masonry.prototype );
	console.log(AutoFillUp.prototype);
		
	// default options
	AutoFillUp.prototype.options = {
		containerStyle: {
			position: 'relative'
		},
		isInitLayout: true,
		isOriginLeft: true,
		isOriginTop: true,
		isResizeBound: true,
		// item options
		transitionDuration: '0.4s',
		hiddenStyle: {
			opacity: 0,
			transform: 'scale(0.001)'
		},
		visibleStyle: {
			opacity: 1,
			transform: 'scale(1)'
		}
		
		//edit by zak
		,isAutoFillUp: false
		,autoFillUpMode: 'default' //extended
		,autoFillUpElems: []
		,autoFillUpFeaturedElems: []
		,autoFillUpLandscapeElems: []
		,autoFillUpPortraitElems: []
	};
	

	////////////////////////////////////////////////////////////////////////////////////////////////
	// OVERWRITTEN METHODS FROM =>     O U T L A Y E R   &&    M A S O N R Y
	////////////////////////////////////////////////////////////////////////////////////////////////
		
	/**
	 * get the items to be laid out
	 * you may want to skip over some items
	 * @param {Array} items
	 * @returns {Array} items
	 */
	AutoFillUp.prototype._getItemsForLayout = function( items ) {
	  var layoutItems = [];
	  for ( var i=0, len = items.length; i < len; i++ ) {
		var item = items[i];
		//edit by zak for ff/ ie browser 
		if ( !item.isIgnored && !(item.element.className.indexOf(DUMMY) !=-1) ) {
		  layoutItems.push( item );
		}
	  }
	  return layoutItems;
	};
	
	/**
	 * layout items
	 * @param {Array} items
	 * @param {Boolean} isInstant
	 */
	AutoFillUp.prototype._layoutItems = function( items, isInstant ) {
		if ( !items || !items.length ) {
			// no items, emit event with empty array
			this.emitEvent( 'layoutComplete', [ this, items ] );
			return;
		}
		
		// emit layoutComplete when done
		this._itemsOn( items, 'layout', function onItemsLayout() {
			this.emitEvent( 'layoutComplete', [ this, items ] );
		});
		
		var queue = [];
	
		for ( var i=0, len = items.length; i < len; i++ ) {
			var item = items[i];
			
				// get x/y object from method
				var position = this._getItemLayoutPosition( item );
				
				// enqueue
				position.item = item;
				position.isInstant = isInstant;
				
				///////////////////////////////////////////////////////////////////////////////////////////
				//edit by zak
				position.item.size.outerHeight = Math.round(item.size.outerHeight);
				position.item.size.outerWidth = Math.round(item.size.outerWidth);
				///////////////////////////////////////////////////////////////////////////////////////////
			
				queue.push( position );
			
		}
		
		////////////////////////////////////////////////////////////////////////////////////////////////
		//edit by zak
		if(this.getAutoFillUp()){
			queue = this._initAutoFillUp( queue );
		}
		////////////////////////////////////////////////////////////////////////////////////////////////
		
		this._processLayoutQueue( queue );
	};
	
	/**
	 * get layout position for items => Math.round introduced for ff browser
	 * @param {Array} items
	 * @returns {Array} queue 
	 */
	AutoFillUp.prototype._getItemLayoutPosition = function( item ) {
		item.getSize();
		// how many columns does this brick span
		//var colSpan = Math.ceil( item.size.outerWidth / this.columnWidth );
		var colSpan = Math.ceil( Math.round(item.size.outerWidth) / Math.round(this.columnWidth) );
		colSpan = Math.min( colSpan, this.cols );

		var colGroup = this._getColGroup( colSpan );
		// get the minimum Y value from the columns
		var minimumY = Math.min.apply( Math, colGroup );
		var shortColIndex = indexOf( colGroup, minimumY );
		
		// position the brick
		var position = {
		  x: Math.round(this.columnWidth) * shortColIndex,
		  y: Math.round(minimumY)
		};
	
		// apply setHeight to necessary columns
		var setHeight = Math.round(minimumY) + Math.round(item.size.outerHeight);
		var setSpan = this.cols + 1 - colGroup.length;
		for ( var i = 0; i < setSpan; i++ ) {
		  this.colYs[ shortColIndex + i ] = setHeight;
		}

		return position;
	};
	
	
	/**
	 * iterate over array and position each item
	 * Reason being - separating this logic prevents 'layout invalidation'
	 * thx @paul_irish
	 * @param {Array} queue
	 */
	AutoFillUp.prototype._processLayoutQueue = function( queue ) {
		for ( var i=0, len = queue.length; i < len; i++ ) {
			var obj = queue[i];
			//this._log(obj);
			this._positionItem( obj.item, obj.x, obj.y, obj.isInstant );
			
			//edit by zak
			if(obj.isDummy == true){
				var $div = obj.item.element.outerHTML;
				//this._log( $div );
		
				if(this.element.id != ''){
					
					if(this._checkMatrix(tmpMatrix, oldMatrix)){
						$('#'+this.element.id).append($div);
					}else{
						$('#'+this.element.id).append($($div).fadeIn(200) );
					}
				}
			}
			////////////////////////////////////////////////////////////////////////////////////
			
		}//endfor
		
		//for later check
		oldMatrix = tmpMatrix;
					
	};
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	// M A I N   M E T H O D S  =>  A U T O F I L L U P
	////////////////////////////////////////////////////////////////////////////////////////////////
	
	//edit by zak
	/**
	 * initialize AutofillUp
	 * @param {Array} queue
	 * @returns {Array} queue 
	 */
	AutoFillUp.prototype._initAutoFillUp = function(queue) {
		////////////////////////////////////////////////////////////////////////////////////////////////
		//edit by zak
		//check matrix and append / reorder if there is a gap 
		
		if ( this.options.isAutoFillUp ) {
			this._log( queue );	

			queue = this._removeDummies( queue );
			
			var container = this._getSizingContainer();
			var size = getSize( container );
			var elem = this._getElement(queue);

			this._log(size);

			var last = ( Math.round(elem['y']) +  Math.round(elem['item']['size']['outerHeight']) != '-Infinity') 
			? Math.round(elem['y']) + Math.round(elem['item']['size']['outerHeight'])
			: Math.round(size.outerHeight);
			
			var cols = elem['item']['layout']['cols'];
			var columnWidth = Math.round(elem['item']['layout']['columnWidth']);
			
			var rows = Math.round(last / columnWidth);
			
			this._log(elem);
			this._log(last);
			this._log("Columns: " + cols);
			this._log("Rows: " + rows);
			
			try {
				if(rows != '-Infinity'){
					
					var matrix = this._initMatrix(rows, cols);
					
					this._printMatrix(matrix);
					
					matrix = this._fillMatrix(queue, matrix, columnWidth);
					
					this._printMatrix(matrix);
					
					queue = this._adaptMatrix(queue, matrix, columnWidth);
					
					//this._printMatrix(matrix);
				}//endif
			} catch (err) {
					console.log(err);
				}
		}//endif
	
		//for later check
		tmpMatrix = matrix;
		
		return queue;
	};
	
	
	//edit by zak
	/**
	* remove Dummy Elements from html 
	**/
	AutoFillUp.prototype._removeHTMLDummies = function(){
		$('.'+DUMMY).each(function(){ $(this).remove(); });
	};
	
	//edit by zak
	/**
	* remove Dummy Elements from queue and html 
	* @param {Array} queue
	* @returns {Array} queue
	**/
	AutoFillUp.prototype._removeDummies = function(queue){
		//delete all dummy gap divs before calculating from html and from the queue ;)
		this._removeHTMLDummies();
		
		for(var i = queue.length - 1; i >= 0; i--) {
			if( (queue[i].y == '-Infinity') || (queue[i].isDummy) ){
				queue.splice(i, 1);
			}
		}
		return queue;
	};
	
	//edit by zak
	/**
	 * get element 
	 * @param {Array} elem
	 * @returns {Array} queue 
	 */
	AutoFillUp.prototype._getElement = function(queue){
		
		var elem = [];
		var height = 0;
		var outerHeight = 0;
		
		//console.log(queue);
		
		for(var i = 0 ; i < queue.length; i++) {
			if(!queue[i]['isDummy']){
				if( height < Math.round(queue[i]['y']) ) {
					height = Math.round(queue[i]['y']);
				}
			}	
		}
		
		var arr = [];
		for(var i = 0 ; i < queue.length; i++) {
			if(!queue[i]['isDummy']){
				if( Math.round(queue[i]['y'])  == height){
					arr.push(queue[i]);
				}
			}
		}
			
		for(var i = 0 ; i < arr.length; i++) {
			if(  outerHeight < Math.round(arr[i]['item']['size']['outerHeight']) ){
				outerHeight = Math.round(arr[i]['item']['size']['outerHeight']);
				elem = arr[i];
			}
		}

		return elem;  
	};
	
	//edit by zak
	/**
	 * initialize matrix => matrix[i][j] = 0
	 * @param {Array} elems
	 * @returns {Array} items 
	 */
	AutoFillUp.prototype._getAutoFillUpElements = function(elems){
		
		var items = this.addItems( elems );
		if ( !items.length ) {
			return;
		}
		return items;  
	};
	
	//edit by zak
	/**
	 * initialize matrix => matrix[i][j] = 0
	 * @param {Array} items
	 * @param {Number} k
	 * @param {Number} i
	 * @param {Number} j
	 * @param {Number} columnWidth
	 * @returns {Array} newPosition 
	 */
	AutoFillUp.prototype._fillUpTiles = function(items, k, i, j, columnWidth) {
		items[k]['position']['y'] = i * columnWidth;
		items[k]['position']['x'] = j * columnWidth;
		
		var newPosition = null;
		newPosition = {
			y: i * columnWidth,
			x: j * columnWidth
		};
		newPosition.item = items[k];
		
		newPosition.isInstant = false;
		newPosition.isDummy = true;
		return newPosition ;
		
	};
	
	//edit by zak
	/**
	 * check matrix => matrix[i][j] == 0 is gap
	 * @param {Array} matrix
	 * @returns {Array} queue - Array with coordinates of tiles
	 * @returns {Array} matrix - Array to check gaps
	 * @returns {Number} columnWidth - default width
	 */
	AutoFillUp.prototype._adaptMatrix = function(queue, matrix, columnWidth) {	
		
		var items = 
		(this._getAutoFillUpElements(this.options.autoFillUpElems) != null) 
		?this._getAutoFillUpElements(this.options.autoFillUpElems) 
		: [];
		var featuredItems = 
		(this._getAutoFillUpElements(this.options.autoFillUpFeaturedElems) != null) 
		?this._getAutoFillUpElements(this.options.autoFillUpFeaturedElems) 
		: [];
		var landscapeItems = 
		(this._getAutoFillUpElements(this.options.autoFillUpLandscapeElems) != null) 
		?this._getAutoFillUpElements(this.options.autoFillUpLandscapeElems) 
		: [];
		var portraitItems = (this._getAutoFillUpElements(this.options.autoFillUpPortraitElems) != null) 
		?this._getAutoFillUpElements(this.options.autoFillUpPortraitElems) 
		: [];
		
		//counter for dummy pics => single items
		var k = 0;
		var featuredCnt = 0; //counter for dummy pics => featured items
		var landscapeCnt = 0; //counter for dummy pics => Landscape items
		var portraitCnt = 0;	//counter for dummy pics => portrait items
		
		//this._log(items[k]);
		for (var i = 0; i < matrix.length; i++) {
			for (var j = 0; j < matrix[i].length; j++) {
				
				//this._log('Matrix['+i+', '+j+']:= '+'\"'+matrix[i][j]+'\" ');
				try {
					if(matrix[i][j] == 0){
						this._log('Matrix['+i+', '+j+']:= '+'\"'+matrix[i][j]+'\" ');
						
						if(items[k] != 'undefined' && items[k] != null){
							
							if(this.options.autoFillUpMode == 'extended'){
								
								this._log('(j+1) '+ (j+1) + " = (matrix.length) "+matrix.length);
								this._log('(i+1) '+ (i+1) + " = (matrix[i].length) "+matrix[i].length);
								
								//featured
								if(  
								((i+1) < matrix.length)
								&& ((j+1) < matrix[i].length)
								&& (parseInt(matrix[i+1][j+1]) == 0) 
								&&  (parseInt(matrix[i][j+1]) == 0) 
								&&  (parseInt(matrix[i+1][j]) == 0) 
								){
									this._log('featured tiles');
									
									matrix[i][j] = 1;
									matrix[i+1][j] = 1;
									matrix[i][j+1] = 1;
									matrix[i+1][j+1] = 1;
									queue.push(this._fillUpTiles(featuredItems, featuredCnt, i, j, columnWidth, queue));
									featuredCnt = featuredCnt + 1;
								}
								//portrait
								else if(
								((i+1) < matrix.length)
								&& (j < matrix[i].length)
								&& parseInt(matrix[i+1][j]) == 0
								){
									this._log('portrait tiles');
									
									matrix[i][j] = 1;
									matrix[i+1][j] = 1;
									queue.push(this._fillUpTiles(portraitItems, portraitCnt, i, j, columnWidth, queue));
									portraitCnt = portraitCnt + 1;
								}
								//landscape
								else if( 
								(i< matrix.length)
								&& ((j+1) < matrix[i].length)
								&& parseInt(matrix[i][j+1]) == 0
								){
									this._log('landscape tiles');
									
									matrix[i][j] = 1;
									matrix[i][j+1] = 1;
									queue.push(this._fillUpTiles(landscapeItems, landscapeCnt, i, j, columnWidth, queue));
									landscapeCnt = landscapeCnt + 1;
								}
								
								//normal
								else {
									matrix[i][j] = 1;
									queue.push(this._fillUpTiles(items, k, i, j, columnWidth,  queue));
									k = k + 1;
								} //else
								
								this._log("--");
							
							//default	
							} else {
								matrix[i][j] = 1;
								queue.push(this._fillUpTiles(items, k, i, j, columnWidth, queue));
								k = k + 1;
							}//end else

						}//endif
					}//endif
				} catch (err) {
					queue = this._removeDummies(queue);
					//console.log(err);
					return queue;
				}
			}
		}
		
		return queue;
	};
	
	//edit by zak
	/**
	 * print matrix
	 * @param {Array} queue - Array with coordinates of tiles
	 * @param {Array} matrix - Array to check gaps
	 * @param {Array} columnWidth - default Width of a tile 
	 * @returns {Array} matrix 
	 */
	AutoFillUp.prototype._fillMatrix = function(queue, matrix, columnWidth) {	
		this._log(queue);
		for ( var i=0; i < queue.length; i++ ) {
			this._log("X:" + queue[i]['x'] + " Y:" +  queue[i]['y'] + " Width: "+ queue[i]['item']['size']['outerWidth'] + " Height: "+ queue[i]['item']['size']['outerHeight'] );
			
			var x = Math.round(queue[i]['x']) / columnWidth;
			var y = Math.round(queue[i]['y']) / columnWidth;
			this._log(x + " " + y);
		
			try {
				
				if(matrix[y][x]  || matrix[y][x] != 'undefined'){
					
					matrix[y][x] = 1;
					//landscape
					if(Math.round(queue[i]['item']['size']['outerWidth']) == (columnWidth*2) ){
						matrix[y][x+1] = 1 ;
					}
					//portrait
					if(Math.round(queue[i]['item']['size']['outerHeight']) == (columnWidth*2) ){
						matrix[y+1][x] = 1 ;
					}
					//featured
					if( (Math.round(queue[i]['item']['size']['outerWidth']) == (columnWidth*2)) 
					&& (Math.round(queue[i]['item']['size']['outerHeight']) == (columnWidth*2))){
						matrix[y+1][x+1] = 1 ;
					}
				}
				
			} catch (err) {
				this._removeHTMLDummies();
				//console.log(err);
				return matrix;
			}
			
		}
		
		return matrix;
	};
	
	//edit by zak
	/**
	 * initialize matrix => matrix[i][j] = 0
	 * @param {Number} rows
	 * @param {Number} cols
	 * @returns {Array} matrix - Array to check gaps
	 */
	AutoFillUp.prototype._initMatrix = function(rows, cols) {	
		// M A T R I X
		var matrix = new Array(rows);
		
		// init matrix with 0
		for (var i = 0; i < matrix.length; i++) {
			matrix[i] = new Array(cols);
			for (var j = 0; j < matrix[i].length; j++) {
				matrix[i][j] = 0;
			}
		}
		return matrix;
	};
	
	//edit by zak
	/**
	 * print matrix => matrix[i][j] == 0 is gap
	 * @param {Array} matrix - Array to check gaps
	 */
	AutoFillUp.prototype._printMatrix = function(matrix) {	
		
		var s='';
		for (var i = 0; i < matrix.length; i++) {
			s = s +"\n";
			for (var j = 0; j < matrix[i].length; j++) {
				s=s+'Matrix['+i+', '+j+']:= '+'\"'+matrix[i][j]+'\" ';
			}
		}
		s = s +"\n";
		this._log(s);
		//console.log(s);
	};
	
	//edit by zak
	/**
	 * console output
	 * @param {String} txt 
	 */
	AutoFillUp.prototype._log = function(txt) {
		if(isDebugMode == true){
			console.log(txt);
		}
	};
	
	//edit by zak
	/**
	 * check matrix => 
	 * @param {Array} matrix
	 * @param {Array} oldMatrix
	 * @returns {Boolean} 
	 */
	AutoFillUp.prototype._checkMatrix = function( matrix, oldMatrix ) {
		
		if(matrix 
		&& oldMatrix 
		&& matrix.length != oldMatrix.length 
		&& matrix[0].length != oldMatrix[0].length){
			return false;
		}
		
		return true;
	};
	
	/**
	* GETTER AND SETTER 
	**/
	AutoFillUp.prototype.setAutoFillUp = function(value){
		this.options.isAutoFillUp = value;
		if(!this.getAutoFillUp()){	
			this._removeHTMLDummies();
		}
	};
	
	AutoFillUp.prototype.getAutoFillUp = function(){
		return this.options.isAutoFillUp;
	};
	
	return  AutoFillUp;
}
if ( typeof define === 'function' && define.amd ) {

  // AMD
  define( [
      'outlayer',
      'get-size'
    ],
    autoFillUpDefinition );
} else {
    // browser global
    window.AutoFillUp = autoFillUpDefinition(
    window.Outlayer,
    window.getSize
  );
}

})( window );
