/* helper
*****************************************/

Array.prototype.contains = function(value){
    for (var key in this)
        if (this[key] === value) return true;
    return false;
}

$(document).ready(function(){
	
	/* globals
	*****************************************/	
	var IS_DEBUG_MODE = false;
	
	var MSNRY = null;
	var LIKEARRAY=[];
	var TILE_CONTAINER = '#tile-container2';
	var $CONTAINER = null;
	var IS_AUTO_FILL_UP = true;
	
	var BRICKS = $('div.brick');
	var SIDENAVIGATION_FADE_TIME = 200;
	
	var SNAPPER = null;
	
	/* helper
	*****************************************/	
	
	var isIOS = function () {
	
		if( (navigator.userAgent.match(/iPad/i))  || (navigator.userAgent.match(/iPhone/i)) ){
			return true;
		}
		return false;
	};
	
	
	var isMobile = function() { 
		var iPadAgent = navigator.userAgent.match(/iPad/i) != null;
		var iPodAgent = navigator.userAgent.match(/iPhone/i) != null;
		var AndroidAgent = navigator.userAgent.match(/Android/i) != null;
		var webOSAgent = navigator.userAgent.match(/webOS/i) != null;

		var isTwoTiles = (480 < document.documentElement.clientWidth  && document.documentElement.clientWidth < 717) ? true : false;
		 
		//if(iPadAgent || iPodAgent || AndroidAgent || webOSAgent){
		if( iPodAgent || AndroidAgent || webOSAgent || isTwoTiles || isIphonePortrait() ){
		    return true;
		}
	};
	
	var isIphonePortrait = function() {
		return ( (0 < document.documentElement.clientWidth) && (document.documentElement.clientWidth < 479) ) ? true : false;
	};
		
	
	/* mapping index.html
	*****************************************/
	var getBlocksByIndex = function() {
		var dataBlockid = new Array();
		dataBlockid[1] = {index: 1, keywords : ''};
		var keywords2 = new Array('KMU', 'Video'); 
		dataBlockid[2] = {index: 2, keywords: keywords2};
		var keywords3 = new Array('KMU', 'Kompetenz'); 
		dataBlockid[3] = {index: 3, keywords: keywords3};
		var keywords4 = new Array('International', 'Zwecknetze'); 
		dataBlockid[4] = {index: 4, keywords: keywords4 };
		var keywords5 = new Array('International', 'Chefsache'); 
		dataBlockid[5] = {index: 5, keywords: keywords5 };
		var keywords6 = new Array('KMU', 'Sparkonto'); 
		dataBlockid[6] = {index: 6, keywords: keywords6};
		var keywords7 = new Array('International', 'Institutionelle Kunden'); 
		dataBlockid[7] = {index: 7, keywords: keywords7};
		var keywords8 = new Array('KMU', 'Super Event'); 
		dataBlockid[8] = {index: 8, keywords: keywords8};
		var keywords9 = new Array('KMU', 'Product'); 
		dataBlockid[9] = {index: 9, keywords: keywords9};
		var keywords10 = new Array('KMU','Währungen'); 
		dataBlockid[10] = {index: 10, keywords: keywords10};
		var keywords11 = new Array('KMU', 'Post'); 
		dataBlockid[11] = {index: 11, keywords: keywords11};
		var keywords12 = new Array('Privatsache', 'Privileg 50'); 
		dataBlockid[12] = {index: 12, keywords: keywords12};
		var keywords13 = new Array('Privatsache', 'News'); 
		dataBlockid[13] = {index: 13, keywords: keywords13};
		var keywords14 = new Array('Privatsache', 'Langer Atem'); 
		dataBlockid[14] = {index: 14, keywords: keywords14};
		var keywords15 = new Array('International', 'Netzwerke'); 
		dataBlockid[15] = {index: 15, keywords: keywords15};
		var keywords16 = new Array('International', 'Chefsache'); 
		dataBlockid[16] = {index: 16, keywords: keywords16};
		return dataBlockid;
	};
	
	var getBlocksByDashboard = function() {
		var dataBlockid = new Array();
		dataBlockid[1] = {index: 1, keywords : ''};
		var keywords2 = new Array('KMU', 'Video'); 
		dataBlockid[2] = {index: 2, keywords: keywords2};
		var keywords3 = new Array('KMU', 'Kompetenz'); 
		dataBlockid[3] = {index: 3, keywords: keywords3};
		var keywords4 = new Array('International', 'Zwecknetze'); 
		dataBlockid[4] = {index: 4, keywords: keywords4 };
		var keywords5 = new Array('International', 'Chefsache'); 
		dataBlockid[5] = {index: 5, keywords: keywords5 };
		var keywords6 = new Array('KMU', 'Sparkonto'); 
		dataBlockid[6] = {index: 6, keywords: keywords6};
		var keywords7 = new Array('International', 'Institutionelle Kunden'); 
		dataBlockid[7] = {index: 7, keywords: keywords7};
		var keywords8 = new Array('KMU', 'Super Event'); 
		dataBlockid[8] = {index: 8, keywords: keywords8};
		var keywords9 = new Array('KMU', 'Product'); 
		dataBlockid[9] = {index: 9, keywords: keywords9};
		var keywords10 = new Array('KMU','Währungen'); 
		dataBlockid[10] = {index: 10, keywords: keywords10};
		var keywords11 = new Array('KMU', 'Post'); 
		dataBlockid[11] = {index: 11, keywords: keywords11};
		var keywords12 = new Array('Privatsache', 'Privileg 50'); 
		dataBlockid[12] = {index: 12, keywords: keywords12};
		var keywords13 = new Array('Privatsache', 'News'); 
		dataBlockid[13] = {index: 13, keywords: keywords13};
		var keywords14 = new Array('Privatsache', 'Langer Atem'); 
		dataBlockid[14] = {index: 14, keywords: keywords14};
		var keywords15 = new Array('International', 'Netzwerke'); 
		dataBlockid[15] = {index: 15, keywords: keywords15};
		var keywords16 = new Array('International', 'Chefsache'); 
		dataBlockid[16] = {index: 16, keywords: keywords16};
		return dataBlockid;
	};
	
	var getBlocksByFinance = function() {
		var dataBlockid = new Array();
		dataBlockid[1] = {index: 1, keywords : ''};
		var keywords2 = new Array('KMU', 'Kanton' ,'Video'); 
		dataBlockid[2] = {index: 2, keywords: keywords2};
		var keywords3 = new Array('KMU', 'Kompetenz'); 
		dataBlockid[3] = {index: 3, keywords: keywords3};
		var keywords4 = new Array('International', 'Chefsache', 'Zwecknetze'); 
		dataBlockid[4] = {index: 4, keywords: keywords4 };
		var keywords5 = new Array('International', 'Chefsache', 'Chef'); 
		dataBlockid[5] = {index: 5, keywords: keywords5 };
		var keywords6 = new Array('KMU', 'Sparkonto'); 
		dataBlockid[6] = {index: 6, keywords: keywords6};
		var keywords7 = new Array('International', 'Institutionelle Kunden'); 
		dataBlockid[7] = {index: 7, keywords: keywords7};
		var keywords8 = new Array('KMU', 'Super Event'); 
		dataBlockid[8] = {index: 8, keywords: keywords8};
		var keywords9 = new Array('KMU', 'Product'); 
		dataBlockid[9] = {index: 9, keywords: keywords9};
		var keywords10 = new Array('KMU','Währungen'); 
		dataBlockid[10] = {index: 10, keywords: keywords10};
		var keywords11 = new Array('KMU', 'Kanton'); 
		dataBlockid[11] = {index: 11, keywords: keywords11};
		var keywords12 = new Array('Privatsache', 'Privileg 50'); 
		dataBlockid[12] = {index: 12, keywords: keywords12};
		var keywords13 = new Array('Privatsache', 'News'); 
		dataBlockid[13] = {index: 13, keywords: keywords13};
		var keywords14 = new Array('Privatsache', 'Langer Atem'); 
		dataBlockid[14] = {index: 14, keywords: keywords14};
		/*
		var keywords15 = new Array('International', 'Netzwerke'); 
		dataBlockid[15] = {index: 15, keywords: keywords15};
		var keywords16 = new Array('International', 'Chefsache'); 
		dataBlockid[16] = {index: 16, keywords: keywords16};
		*/
		return dataBlockid;
	};
	
	var getBlocks = function(){
		if($.url().attr('file') == 'index.html' ||  $.url().attr('file') == ''){
				return getBlocksByIndex();
		}
		
		if($.url().attr('file') == 'dashboard.html'){
			return getBlocksByDashboard();
		}
		
		if($.url().attr('file') == 'finanzplanung.html'){
			return getBlocksByFinance();
		}
		
		return null;
	};
	
	var setMapping = function() {
		var dataBlockid = null;
		//log($.url());
		if($.url().attr('file') == 'index.html' ||  $.url().attr('file') == ''){
			//log('index.html');
			//hide buttons for anonymous user
			$('.love-li').hide();
			$('.star-li').hide();
			$('.share-li .share').hide();
			//main
			dataBlockid = getBlocks();
			setKeywordTags(dataBlockid);
		}
		if($.url().attr('file') == 'dashboard.html'){
			//main
			dataBlockid = getBlocks();
			setKeywordTags(dataBlockid);
			$('#container-filtering').hide();
		}
		if($.url().attr('file') == 'finanzplanung.html'){
			//main
			dataBlockid = getBlocks();
			setKeywordTags(dataBlockid);	
		}
		
		
		
	};
	
	var print = function(blocks) {
		for(var k=0; k<blocks.length;k++){
			if(!_.isUndefined(blocks[k])) {
				log(blocks[k]);
			}
		}
	};
	
	//Layout filtering and merken
	var relayout = function(showBlocks) {		
		BRICKS.each(function(){
			var $this = $(this);		
			if($.inArray(parseInt($this.attr('data-blockid')), showBlocks) === -1){
				log("DataBlock "+$this.attr('data-blockid'));
				if($this.hasClass('blueblock') || $this.hasClass('register')  ){
					//log('register');
				}else {
					$this.removeClass('masonry-brick').removeClass('brick').hide();
				}				
			}

		});
		//reload();
		setSidebarHeight3();

	};
	
	
	////// ######################################################################
	
	var getKeywords = function(dataBlockid) {
		var dataKeywords = new Array();
		for (var i=0; i<dataBlockid.length; i++){
			if(dataBlockid[i] != null && dataBlockid[i]['keywords'] != null){
				//log(dataBlockid[i]['keywords']);
				for (var j=0; j<dataBlockid[i]['keywords'].length; j++){
					if($.inArray(dataBlockid[i]['keywords'][j], dataKeywords) === -1){
						//log(dataBlockid[i]['keywords'][j]);
						dataKeywords.push(dataBlockid[i]['keywords'][j]);
					}
				}
			}
		}	
		return dataKeywords;
	};
	
	var getKeywordsCounter = function(dataKeywords) {
		var dataBlockid = getBlocks();		
		var cnt = 0;
		for (var i=0; i<dataBlockid.length; i++){
			if(dataBlockid[i] != null && dataBlockid[i]['keywords'] != null){
				//log(dataBlockid[i]['keywords']);
				for (var j=0; j<dataBlockid[i]['keywords'].length; j++){
					//log(dataKeywords +'  - '+dataBlockid[i]['keywords'][j]);
					if(dataKeywords == dataBlockid[i]['keywords'][j]){
						cnt = cnt + 1;
					}
				}
			}
		}	
		
		if(cnt == 1){
			return '';
		}
		return ' ('  + cnt + ') ' ;
	}
	
	var printKeywords = function(dataKeywords) {
	
		for(var k=0; k<dataKeywords.length;k++){
			var btn = '<input type="button" class="" data-active="0" data-value="' + dataKeywords[k]  + '" value="' 
				+ dataKeywords[k] 
				+ getKeywordsCounter(dataKeywords[k]) 
				+  '"'
				+ ' style="">';	
			$('#container-filtering .keyword-tile').append(btn);
		}
		
	};
	
	var isValidKeyword = function(block, selectedKeywords) {
	
		var arr = new Array();
		/*
		log('');
		log('------------- BLOCK '+block['index']);
		log(block);
		log('##### tags');
		log(selectedKeywords);
		*/
		arr = _.intersection(block['keywords'], selectedKeywords);
		/*
		log('------------- contains');
		log(arr);
		*/
		return _.isEqual(selectedKeywords, arr);

	};

	var getSelectedKeywords = function() {
		var selectedBlocks = []; 
		$('#container-filtering .keyword-tile input').each(function(){			
			if($(this).attr('data-active') == '1'){
				//log($(this).attr('data-value'));
				selectedBlocks.push($(this).attr('data-value'));
			}
		});
		//print(selectedBlocks);
		return _.toArray(selectedBlocks);
	};
	
	var markRelatedKeywords = function(tag, selected, flag){
	
		var dataBlockid = getBlocks();	
		var keywordArray = new Array();

		_.each(dataBlockid, function(block) {
		
			var tmpKeywordArray = new Array();

			//log(_.toArray(block['keywords']));
			//log(tag);
			//log(selected);
			
			for (var i=0; i<selected.length; i++){
				if(flag == true && _.contains(_.toArray(block['keywords']), selected[i])) {
					tmpKeywordArray.push(1);
				}else {
					tmpKeywordArray.push(0);
				}
			}
			
			//log('######---#######');
			//log(tmpKeywordArray);

			if( _.contains(tmpKeywordArray, 1)  && !_.contains(tmpKeywordArray, 0)){
				log(_.toArray(block['keywords']));
				keywordArray.push(_.toArray(block['keywords']));
			}
			//log('######---#######');
			
		});
		
		log('######---#######');
		log(keywordArray);
		log('######---#######');
		
		return keywordArray;
	};
	

	var styleKeywords = function(val, relatedKeywordArray){
		var selectedBlocks = new Array(); 
		$('#container-filtering .keyword-tile input').addClass('tag-inactive').attr("disabled", true).removeClass('cursor-pointer');
		
		//related tags
		for (var i=0; i<relatedKeywordArray.length; i++){
			$('#container-filtering .keyword-tile input[data-value="'+relatedKeywordArray[i]+'"]').removeClass('tag-inactive').removeClass('tag-active').removeAttr("disabled").addClass('cursor-pointer').addClass('tag-normal');
		}
		//active tags
		$('#container-filtering .keyword-tile input[data-active="1"]').removeClass('tag-inactive').removeClass('tag-normal').removeAttr("disabled").addClass('cursor-pointer').addClass('tag-active');
		
	//	log('hurray');
	//	log($('#container-filtering .keyword-tile input[data-active="0"]').length);
		
		if($('#container-filtering .keyword-tile input[data-active="1"]').length == 0){
			resetKeywords();
		}
		
	};
	
	var showValidBlocks = function(relatedKeywordArray) {
		var shownBlocks = new Array();
		log('*************************************************');	
		log(relatedKeywordArray);
		BRICKS.each(function(){
			var tag = $(this).attr('data-tags');
			log($(this));
			for (var i=0; i<relatedKeywordArray.length; i++){
				var selectedTags = "";
				for (var j = 0; j < relatedKeywordArray[i].length; j++) {
				  selectedTags = selectedTags + relatedKeywordArray[i][j] + ",";
				}
				
				if(selectedTags.substring(0, selectedTags.length - 1) == tag){
					log(selectedTags.substring(0, selectedTags.length - 1) );
					log(tag);
					shownBlocks.push(parseInt($(this).attr('data-blockid')) );
				}
			}
			
		});

		return shownBlocks;
	};

	var setKeywordsEventHandler = function(dataBlockid) {
		var  shownGlobalBlocks = new Array();
		var flag= new Boolean(0);
		
		$('#container-filtering .keyword-tile input').each(function(){

			$(this).click(function(){ 
					
					var  shownBlocks = new Array();
					var relatedKeywordArray = new Array();
					var val = $(this).attr('data-value');
					//log($(this));
					if($(this).attr('data-active') == '0'){
						$(this).attr('data-active', '1');
						flag = new Boolean(1);
					}
					else if($(this).attr('data-active') == '1'){
						$(this).attr('data-active', '0');
					}
					
					//log('##################');
					//log(getSelectedKeywords());
					//log('##################');
					
					relatedKeywordArray = markRelatedKeywords(val, getSelectedKeywords(), flag);
					shownBlocks = showValidBlocks(relatedKeywordArray);
					relatedKeywordArray =_.uniq(_.flatten(relatedKeywordArray));
					
					
					log('$$$$$$$$$$$$$$$');
					log(relatedKeywordArray);
					log(shownBlocks);
					log('$$$$$$$$$$$$$$$');
					/**/
					
					styleKeywords(val, relatedKeywordArray);
					if(shownBlocks.length > 0){
						relayout2(shownBlocks, flag);
					}else {
						reset();
					}
					
			});
		});
		
		$('#filter-btn').live('click', function(){
				$('div.tile').each(function(){
					var $this = $(this);	
					$this.addClass('masonry-brick').addClass('brick').show();
				});
	
				relayout2(shownGlobalBlocks, false);
		});
		
	};
	
	var setKeywordTags = function(dataBlockid) {
		var  dataKeywordsCounter = new Array();
		setKeywordAttribute(dataBlockid);
		var dataKeywords = getKeywords(dataBlockid);
		//print(dataKeywords);
		printKeywords(dataKeywords);
		setKeywordsEventHandler(dataBlockid);
		
	};
	////// ######################################################################
	
	var setKeywordAttribute = function(dataBlockid) {
		for (var i=0; i<dataBlockid.length; i++){
			//log(dataBlockid[i]);
			if(dataBlockid[i] != null){
				//log($('div.brick[data-blockid="' + dataBlockid[i].index+ '"]'));
				$('div.brick[data-blockid="' + dataBlockid[i].index+ '"]').attr('data-tags', dataBlockid[i].keywords);
			}
		}
	};	
	
	//Layout filtering and merken
	var relayout2 = function(showBlocks, flag) {		
		var dataBlockid = getBlocks();
		log('______________________');
		log(showBlocks);
		log('______________________');
		
		BRICKS.each(function(){
			var $this = $(this);		
			
			if($this.attr('data-blockid') != null){
				if(_.contains(showBlocks, parseInt($this.attr('data-blockid')) ) ) {
					$this.addClass('masonry-brick').addClass('brick').show();
				}else {
					if($this.hasClass('blueblock') || $this.hasClass('register')  ){
						//log('register');
					}else {
						//if(flag) {
							$this.removeClass('masonry-brick').removeClass('brick').hide();
						//}
					}	
				}
				/*
				if($.inArray(parseInt($this.attr('data-blockid')), showBlocks) === -1){
					log("DataBlock "+$this.attr('data-blockid'));
					if($this.hasClass('blueblock') || $this.hasClass('register')  ){
						//log('register');
					}else {
						if(flag){
							$this.removeClass('masonry-brick').removeClass('brick').hide();
						}
						else{
							$this.addClass('masonry-brick').addClass('brick').show();
						}
					}				
				}
				*/
			}
		});

		reload(true);
		setSidebarHeight3();
	};
	
	var resetKeywords = function() {
		$('#container-filtering .keyword-tile input').each(function(){
			$(this).removeClass('tag-inactive').removeClass('tag-active').removeAttr("disabled").addClass('cursor-pointer').addClass('tag-normal').attr('data-active','0');
		});
	};
	
	
	
	
	/* helper
	*****************************************/
	var setContainerContent = function(sidebarWidth) {
		var sliderIconWidth = 42;
		var width = $(document).width();
		//$('#container-main').css('width', (width - 2*sliderIconWidth);
		//$('#container-main').css('width', (width - 2*sliderIconWidth - sidebarWidth) );
	};
	
	$(window).resize(function() {
		
		//log(isSidebarActive());
		if(isSidebarActive() == true){
			//log('offen');
			setContainerContent(260);
		}else {
			//log('zu');
			setContainerContent(0);
		}
		
		ini_mobile();
		
		setContainerMain();
		
		reload();
		
	});	
	
	var setContainerMain = function() {
		var windowWidth = $(window).width();
		//log(windowWidth);
		
		if(windowWidth < 1012){
			//$('.header-wrapper').css('width', windowWidth-42);
		}
		
		$('#container-main').css('width', windowWidth);
		
	};
		
	var setSidebarHeight3 = function() {
		var height = $('#container-main').height();
		//$('#container-sidebar').css('height', height);
		$('#container-sidebar').css('height', height);
		
	};
	
	var setOverlayHeight = function() {		
		$('.tile-light-title').each(function(){
			var height = $(this).css('height');
			if($(this).prev().attr('class') == 'tile-light-title-overlay'){
				$(this).prev().css('height', height);
			}
		});
		
		$('.tile-desc').each(function(){
			var height = $(this).css('height');
			if($(this).prev().attr('class') == 'tile-desc-overlay'){
				$(this).prev().css('height', height);
			}
		});
	};
	
	var isSidebarActive = function() {
		var $false = new Boolean(0);
		var $true = new Boolean(1);
		
		var display = $('#container-sidebar').css('display');
		//log(display);
		if(display == 'block'){
			return $true;
		}
		return $false;
	};
	

	
	/* masonry/isotope
	*****************************************/
	var reload = function(flag) {
		if(MSNRY != null){
			if(flag != null && flag == true){
				MSNRY.setAutoFillUp(false);
				MSNRY.layout();
			}
			else {
				MSNRY.layout();
			}
		}
		setSidebarHeight3();	  
	};
	
	var ini_masonry = function() {
		
		$CONTAINER = document.querySelector(TILE_CONTAINER);
		imagesLoaded( $CONTAINER, function() {
			MSNRY = new AutoFillUp( $CONTAINER, {
				columnWidth: 240
				,isFitWidth: true
				,isResizeBound: true 

				//zak options
				,isAutoFillUp: IS_AUTO_FILL_UP //((!isIphonePortrait()) ? IS_AUTO_FILL_UP : false)
				,autoFillUpMode:  'extended' // 'default'  //
				
				,autoFillUpElems: setDummyItems(12, 'single', '.jpg')
				,autoFillUpFeaturedElems: setDummyItems(3, 'featured', '.png')
				,autoFillUpLandscapeElems: setDummyItems(3, 'landscape', '.png')
				,autoFillUpPortraitElems: setDummyItems(3, 'portrait', '.png')
		

			});
		});

		//footer tiles
		var footerContainer = document.querySelector('#tile-footer-container');
		var MSNRY2 = new Masonry( footerContainer, {
			itemSelector: '.footer-brick',
			columnWidth:235
		});
	
	
		$('#menu-drawer').click(function(){
			handleSideMenu();
			/*
			setSidebarHeight3();	  
			reload();
			*/	
		});
		

		var button = document.querySelector('.load-more');
		//load more
		eventie.bind( button, 'click', function() {
			createDummyItemElement();			
			setSidebarHeight3();	  
		});
		
	};
	
	var setAutoFillUp_masonry = function() {
		//autofillup nur bei diesen Seiten
		if($.url().attr('file') == 'finanzplanung.html' ||
			$.url().attr('file') == 'index.html' ||  $.url().attr('file') == '' ||
			$.url().attr('file') == 'dashboard.html' 
		){
			//IS_AUTO_FILL_UP = IS_AUTO_FILL_UP;
			if(MSNRY != null){
				MSNRY.setAutoFillUp(IS_AUTO_FILL_UP);
			}
		}else {
			$('#tile-container').css('max-width','1200px');
			
			if(MSNRY != null){
				MSNRY.setAutoFillUp(false);								
			}else {
				var iPhoneInterval = window.setInterval(function(){iphoneRefreshInterval();}, 20);
				function iphoneRefreshInterval() {
					if(MSNRY != null){
						MSNRY.setAutoFillUp(false);
						window.clearInterval(iPhoneInterval);
					}
				}	
			}
		}

	};
	
	function createDummyItemElement() {
		 // create new item elements
		  var elems = [];
		  var fragment = document.createDocumentFragment();
		  for ( var i = 0; i < 6; i++ ) {
			var elem = getItemElement();
			fragment.appendChild( elem );
			elems.push( elem );
		  }
		  // append elements to container
		   $CONTAINER.appendChild( fragment );
		  // add and lay out newly appended elements
		  
		  console.log(MSNRY.getItemElements());
		  MSNRY.options.IS_AUTO_FILL_UP = false;
		  MSNRY.appended( elems );
		  // MSNRY.prepended( elems );
		  MSNRY.layout();
	};
	
	var setDummyItems = function(cnt, mode, filetype){
		var autoFillUpElems = [];	 
		for ( var i = 1; i < cnt; i++ ) {
			var elem = getDummyItemElement(i, mode, filetype);
			autoFillUpElems.push( elem) ;
		}
		return autoFillUpElems;
	};
	
	function getDummyItemElement(i, mode, filetype) {	
		  var elem = document.createElement('div');
		  elem.className = 'tile brick gap';
		  $(elem).addClass('dummy');
		  
		  if(mode == 'featured'){
			$(elem).addClass('featured-tile');
		  }else if(mode == 'landscape'){
			$(elem).addClass('landscape-tile');
		  }else if(mode == 'portrait'){
			$(elem).addClass('portrait-tile');
		  }

		  $(elem).css({'background-image': 'url(\'img/gap/'+mode+'/lukb'+i+filetype+'\')'});
		  return elem;
	};
	
	function getItemElement() {	
		  var elem = document.createElement('div');
		  var wRand = Math.random();
		  var hRand = Math.random();
		  var widthClass = wRand > 0.92 ? 'w4' : wRand > 0.8 ? 'w3' : wRand > 0.6 ? 'w2' : '';
		  var heightClass = hRand > 0.85 ? 'h4' : hRand > 0.6 ? 'h3' : hRand > 0.35 ? 'h2' : '';
		  elem.className = 'tile brick blue ' + widthClass + ' ' + heightClass;
		  var $boxes = $('<h2>Inhalt</h2>'+
                '    <div class="option-wrapper">'+
                '        <ul class="option-table">'+
               '             <li class="eye-li"><span class="left-option">'+Math.floor((Math.random()*100)+1)+'</span> <span class="right-option"><a href="#"><span class="small-icon eye"></span></a></span></li>'+
                '            <li class="chat-li"><span class="left-option">'+Math.floor((Math.random()*100)+1)+'</span> <span class="right-option"><a href="#"><span class="small-icon chat"></span></a></span></li>'+
                '        </ul>'+
                '    </div>')
		  $(elem).append($boxes);
		 
		  return elem;
	};
	
	/* event handler init
	*****************************************/
	var removeActive = function(menu) {
			menu.each(function(){
				$(this).removeClass('active');
			});
	};
	

	var handleSideMenu = function() {
	
		if($('#container-sidebar').attr('data-open') == 0){
			$('#container-sidebar').attr('data-open', 1); 
			setSidebarHeight3();	
			$('#container-sidebar').show();			
			SNAPPER.open('left');			
			
		}else {
			$('#container-sidebar').attr('data-open', 0); 			
			SNAPPER.close();
			var aktiv = window.setInterval(function(){closeSidebar();}, 500);
			
			function closeSidebar() {
			
				$('#container-sidebar').hide();
				//console.log(aktiv);
				window.clearInterval(aktiv);
			}			
		}		
	};
	
	
	var reset = function() {
		resetKeywords();

		$('#tile-container2 .tile').each(function(){
			$(this).addClass('brick').show();	
		});
		
		shownGlobalBlocks = [];
		reload();
	};
	
	var setTopicOnNavigation = function() {
		
		//fix
		$('#navmenu ul.level_2 li').each(function(){
			if($(this).hasClass('active')){
				$('#filter-selection').html('<span class="key">THEMA:</span><span class="topic"> '+$(this).find('a').text()+'</span>');
			}
		});
	};
		
	var ini_handler = function() {
		
		
		//IPhone

		$('#mobile_nav1').click( function(){	
			handleSideMenu();
		});
		
		$('#mobile_nav2').toggle(function(){	
			$('#sub_menu').show();
		}, function(){
			$('#sub_menu').hide();
		});
			
			
		//sidenav
		$('#navclose').click(function(){	
			handleSideMenu();
		});
		
		$('.pageOverlay').live('click', function(){	
			handleSideMenu();
		});
		
		//search
		$(".header-search input[type='text']").focus(function(){
			$(this).val('');
			$(this).css('color', 'black');
		}).blur(function(){
				$(this).val('Suchbegriff');
				$(this).css({ 'color' : '#dddddd', 'font-size' : '16px', 'font-weight' : 'bold' });
			});
			
		//navmenu
		$('#navmenu > li').click(function(){
			removeActive($('#navmenu li'));
			$(this).addClass('active');
			$('#navmenu ul').hide();
			$(this).next().show();
			setTopicOnNavigation();
		});
		
		//mainmenu
		$('#mainmenu li').click(function(){
			removeActive($('#mainmenu li'));
			$(this).addClass('active');
		});	
		

		//button back to top
		$("#back-to-top").backToTop();
		
		//button to bottom
		$("#to-bottom").ToBottom();
		$("#to-bottom2").ToBottom();
		
		//toggle state
		$('#container-main').click(function(){
			if(isSidebarActive() == true){
				$('#container-main').click(function(){	
					//hideNavbar();
				});
			}
		});
		
		//merken
		$('.bookmark').parent().click(function(){
			//log($(this));
			var blockId = $(this).parent().parent().parent().parent().attr('data-blockid');
			if(blockId == null){
				blockId = $(this).parent().parent().parent().parent().parent().attr('data-blockid');
			}

			if($(this).find('.bookmark').hasClass('active')){
				//alertify.success( 'Block ' +blockId+' doch nicht gemerkt !!!' );
				if(!LIKEARRAY.contains(blockId)){
					var i = LIKEARRAY.indexOf(parseInt(blockId));
					if(i != -1) {
						LIKEARRAY.splice(i, 1);
					}
				}
				$(this).find('.bookmark').removeClass('active');
			}
			else{
				if(!LIKEARRAY.contains(blockId)){
					LIKEARRAY.push(parseInt(blockId));
				}
				//alertify.success( 'Block ' +blockId+' gemerkt !!!' );
				$(this).find('.bookmark').addClass('active');
			}
		});
		
		//I like
		$('.love').parent().click(function(){
			//log($(this));
			var blockId = $(this).parent().parent().parent().parent().parent().attr('data-blockid');
			//log(blockid);

			if($(this).find('.love').hasClass('active')){	
				var likes = $(this).parent().prev().text();
				var newlike = parseInt(likes)-1;
				$(this).parent().prev().text(newlike);
				//alertify.success( newlike +' likes !' );
				$(this).find('.love').removeClass('active');
			}
			else{
				var likes = $(this).parent().prev().text();
				var newlike = parseInt(likes)+1;
				$(this).parent().prev().text(newlike);
				//alertify.success( newlike +' likes !' );
				$(this).find('.love').addClass('active');
			}
		});
		
		
		$('.chefsache .portrait-content').click(function(){
				window.location = "chefsache.html";
		});
		/*
		$('.chefsache2').click(function(){
				window.location = "zwecknetze.html";
		});
		
		$('.chefsache3').click(function(){
				window.location = "freundschaft.html";
		});
		
		$('.chefsache4').click(function(){
				window.location = "gewinner.html";
		});
		*/
	
		$('.unternehmertum .featured-content').click(function(){
				window.location = "unternehmertum.html";
		});
		
		$('.kredit .landscape-content').click(function(){
				window.location = "cashmanager.html";
		});
		
		//cashmanager handling
		$('.cashflow').live('click', function(){
			$(this).addClass('cashflow2');
			$(this).removeClass('cashflow');
		});
		
		$('.cashflow2').live('click',function(){
			$(this).addClass('cashflow3');
			$(this).removeClass('cashflow2');
		});
		
		$('.cashflow3').live('click',function(){
			$(this).addClass('cashflow');
			$(this).removeClass('cashflow3');
		});
		
		$('.cashflow3').live('click',function(){
			$(this).addClass('cashflow');
			$(this).removeClass('cashflow3');
		});
		
		$('#finanzplanung').click(function(){
				window.location = "finanzplanung.html";
		});
		
		$('#finanzierung').click(function(){
				window.location = "finanzierung.html";
		});
		
		$('#unternehmerbank').click(function(){
				window.location = "unternehmerbank.html";
		});
		
		//merken btn
		$('#like').click(function(){
			$('#dashboard').parent().removeClass('active');
			$(this).parent().addClass('active');
			//print(LIKEARRAY);
			relayout(LIKEARRAY);
			if(MSNRY != null){
				MSNRY.setAutoFillUp(false);	
			}
			reload();
		});
		
		$('.dashboard_btn_save input').click(function(){
				// confirm dialog
			
			alertify.set({ labels: {
				ok     : "Speichern",
				cancel : "Abbrechen"
			} });
			
			// button labels will be "Accept" and "Deny"
			alertify.confirm("Wollen Sie diese Änderungen abspeichern?", function (e) {
				if (e) {
					// user clicked "ok"
					alertify.success("Ihre Änderungen wurden erfolgreich gespeichert!");
				} else {
					// user clicked "cancel"
					alertify.error("Ihre Änderungen wurden verworfen!");
				}
			});
		});
		
		//login
		$('#login').click(function(e) {
			$('#sign_up').lightbox_me({
				centered: true, 
				onLoad: function() { 
					$('#sign_up').find('input:first').focus()
					}
				});
			e.preventDefault();
		});
		
		//chat
		$('#chat-btn').click(function(e) {
			$('#chat').lightbox_me({
				centered: true, 
				onLoad: function() { 
					$('#chat').find('input:first').focus()
					}
				});
				
			e.preventDefault();
		});
		
		$('#kube').click(function(e) {
			$('#chat').lightbox_me({
				centered: true, 
				onLoad: function() { 
					$('#chat').find('input:first').focus()
					}
				});
				
			e.preventDefault();
		});
		
		$('#chat').click(function(e) {
			$('#chat').trigger('close');
			$('#chat2').lightbox_me({
				centered: true, 
				onLoad: function() { 
					$('#chat2').find('input:first').focus()
					}
				});
				
			e.preventDefault();
		});
		
		$('#chat2').click(function(e) {
			$('#chat2').trigger('close');
			$('#kube').show();	
			e.preventDefault();
		});
		
		$('.logout-image').click(function(e) {
			window.location = "settings.html";
		});
		
		$('#reset-btn').click(function(e) {
			reset();
		});
		
		//tooltips
		$('.bookmark').attr('original-title', 'Ich merke das!')
		$('.bookmark').tipsy();
		
		$('.love').attr('original-title', 'Ich mag das!')
		$('.love').tipsy();

		$('.share').attr('original-title', 'Teile das!')
		$('.share').tipsy();
		
		$('.eye').attr('original-title', 'Betrachtet von ...')
		$('.eye').tipsy();
		
		$('.chat').attr('original-title', 'Kommentiert von ...')
		$('.chat').tipsy();
		
		BRICKS.each(function(){
			var tags = $(this).attr('data-tags');	
			$(this).find('.share').attr('original-title', tags)
		});
		$('.share').tipsy();
		
		//options random numbers
		$('.love-li').each(function(){
			$(this).find('.left-option').text(chance.natural({min: 1, max: 60}));
		});
		
		$('.eye-li').each(function(){
			$(this).find('.left-option').text(chance.natural({min: 1, max: 500}));
		});
		
		$('.chat-li').each(function(){
			$(this).find('.left-option').text(chance.natural({min: 1, max: 100}));
		});
		
	};
	
	var ini_sideNavMenu = function(){
		// init sidemenu
		$('#container-sidebar').attr('data-open', 0); 
		
		if($.url().attr('file') == 'finanzplanung.html' 
		|| $.url().attr('file') == 'unternehmerbank.html' 
		|| $.url().attr('file') == 'finanzierung.html' ){	
		//	handleSideMenu();
			$('#container-sidebar').attr('data-open', '1').show();
			$('#container-main').css('-webkit-transform', 'translate3d(266px, 0, 0)');
			setTimeout(function (){setSidebarHeight3();}, 400);	
		}
		
		//Navigation
		if($.url().attr('file') == 'finanzplanung.html') {
			$('#finanzplanung').parent().addClass('active');
		}else if($.url().attr('file') == 'unternehmerbank.html'){
			$('#unternehmerbank').parent().addClass('active');
			$('#tile-container2').css('margin','5px');
		}else if($.url().attr('file') == 'finanzierung.html'){
			$('#finanzierung').parent().addClass('active');
			$('#tile-container2').css('margin','5px');
		} 
		
		$('#mainmenu').append('<span id="filter-selection"></span>');
		setTopicOnNavigation();
		
		SNAPPER = new Snap({
		   element: document.getElementById('container-main')
		  ,tapToClose: false
		  ,touchToDrag: false
		//   ,transitionSpeed: 0.1
		});
		
	};
	
	/**
	* Styling from keywords block
	**/
	var ini_filterKeywords = function() {
	
		setTimeout(function (){
			var SideNavWidth = $('.keyword-tile').width();
			log('----------------------');
			log("SideNavWidth: "+SideNavWidth);
			log('----------------------');
			
			var lineWidth=0;
			var block="";
			var row = 0;
			var arr = new Array();
			var arrName = new Array();
			
			
			$('.keyword-tile input').each(function(){
		
				//log($(this));
				var width = ($(this).width() + parseInt($(this).css('padding-left')) 
								+ parseInt($(this).css('padding-right')) +10) ;
				lineWidth = lineWidth + width;
				block = $(this).attr('data-value');

				if(lineWidth < SideNavWidth){
					arr.push(width);
					arrName.push(block);
				}
				else {
					
					print_arr(arr);
					style_arr(arr, arrName, row, SideNavWidth);
					
					row = row +1;
					
					lineWidth = 0;
					lineWidth = lineWidth + width;
					
					arr = [];
					arrName = [];
					
					arr.push(width);
					arrName.push(block);
					
					log('----------------------');
				}
				log("Row : "+row+" Breite  => " + width +" Block => " +block + " ==> lineWidth : "+lineWidth);
				
				//$('#container-filtering').show();
			});
			
			print_arr(arr);
			style_arr(arr, arrName, row, SideNavWidth);
			
		}, 400);	
	
	};
	
	var print_arr = function(arr){
		for (var i = 0; i < arr.length; i++) {
			log(arr[i]);
		}
	};
	
	var style_arr = function(arr, arrName, row, SideNavWidth){
		
		var total=0;
		for (var i = 0; i < arr.length; i++) {
			total = total + arr[i] +10;
		}
		log("Total "+total);
		var zusatz = (SideNavWidth - total ) /arr.length;
		log("Zusatz: "+zusatz);
		
		for (var i = 0; i < arrName.length; i++) {
			for (var j = 0; j < arr.length; j++) {
				//if(i==j && (row==0 || row == 1)){
				if(i==j ){
					log(arrName[i]);
					if(j < arr.length-1){
						$('.keyword-tile input[data-value="'+arrName[i]+'"]').css(
						{
							'width': (arr[i]+zusatz )  
							,'margin-right':'10px' 
						});
					}
					else {
						$('.keyword-tile input[data-value="'+arrName[i]+'"]').css(
						{
							'width': (arr[i]+zusatz )  
						});
					}
					
				}
			}
		}
	};
	
	var log = function(txt){
		if(IS_DEBUG_MODE == true) {
			console.log(txt);
		}
	};
	
	
	var ini_less = function(){
		
		less = {
			env: "development", // or "production"
			async: false,       // load imports async
			fileAsync: false,   // load imports async when in a page under
			// a file protocol
			poll: 1000,         // when in watch mode, time in ms between polls
			functions: {},      // user functions, keyed by name
			dumpLineNumbers: "comments", // or "mediaQuery" or "all"
			relativeUrls: false,// whether to adjust url's to be relative
			// if false, url's are already relative to the
			// entry less file
			rootpath: ":/a.com/"// a path to add on to the start of every url
			//resource
		};
	};

	var ini_mobile = function() {
	
		
		if(isMobile()){
		
			if(isIphonePortrait()){
				if(MSNRY != null){
					MSNRY.setAutoFillUp(false);								
				}else {
					var iPhoneInterval = window.setInterval(function(){iphoneRefreshInterval();}, 300);
					function iphoneRefreshInterval() {
						if(MSNRY != null){
							MSNRY.layout();
							window.clearInterval(iPhoneInterval);
						}
					}	
				}
			}else {
				setAutoFillUp_masonry();
			}
			
		} else {
			setAutoFillUp_masonry();
		}

	};

	/*******************************************
	* // MAIN
	********************************************/
	//ini_less();
	
	setMapping();
	
	setOverlayHeight();
	
	setContainerContent(0);

	ini_masonry();
	
	if($.url().attr('file') == 'index.html' ||  $.url().attr('file') == '') {}else{
		//quick fix for option for featured mode
		$('.featured-tile').each(function(){
			var table = $(this).find('.option-table');
			var newDiv = $('<div class="table-left"><li class="bookmark-li">'+$(table).find('.bookmark-li').html()+'</li><li class="love-li">'+$(table).find('.love-li').html()+'</li></div>'+
			'<div class="table-right"><li class="eye-li">'+$(table).find('.eye-li').html()+'</li><li class="chat-li">'+$(table).find('.chat-li').html()+'</li><li class="share-li">'+$(table).find('.share-li').html()+'</li></div>');
			$(table).empty();
			$(table).append(newDiv);
		});
	}
	
	ini_handler();
	
	$('#container-filtering').find('.keyword-tile input').addClass('cursor-pointer');
	
	//chat => personal advisor
	$('#chat-btn span').removeClass('star').addClass('popup').removeAttr('original-title');
	
	ini_sideNavMenu();
	
	ini_filterKeywords();
	
	//quick fix
	$('#filtering-text').text('Sie kÃ¶nnen die Themenauswahl mit Hilfe der untenstehenden Filterbegriffen verfeinern!');
	$('#dashboard a').text('MEINE BANK');
	$('#like').prepend('<span id="like-icon"></span>');
	
	ini_mobile();
	
	if($.url().attr('file') == 'finanzplanung.html' ||
			//$.url().attr('file') == 'index.html' ||  $.url().attr('file') == '' ||
			$.url().attr('file') == 'dashboard.html' 
		){
			$('#container-sidebar').show();
		}
	
	//HOOK on
	SNAPPER.on('close', function(){
		$('#container-sidebar').attr('data-open', 0); 
	});
	
});
