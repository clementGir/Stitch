<!-- HEADER -->
<header>
	<a class="info">
		<span><?php echo file_get_contents("assets/img/svg/info.svg"); ?></span>
	</a>
</header>

<!-- HOME -->
<section class="section--home">
	<h1>
    	<span>stitch</span>
 	 </h1>
	<h2>
    	<span>An immersive webGL beat maker using webVR</span>
  	</h2>  	
	<a class="tour">
    	<p>Take a tour</p> 
		<span><?php echo file_get_contents("assets/img/svg/arrow.svg"); ?></span> 
  	</a>
</section>

<!-- INFO -->
<section class="section--info">
	<header>
		<a class="close--info">
			<?php echo file_get_contents("assets/img/svg/close.svg"); ?>
		</a>
	</header>

	<div class="container">
	    <svg width="200px" height="200px" viewBox="0 0 200 200">
	      <g>
	        <polygon fill="#8E4FC5" points="72.167,173.667 68.167,85 166.833,126.667  "/>
	        <polygon fill="#BA7DF3" points="68.167,85 126.5,26.333 166.833,126.667  "/>
	        <polygon fill="#CA8CFF" points="68.167,85 33.167,76.5 126.5,26.333  "/>
	        <polygon fill="#9F61D8" points="33.167,76.5 72.167,173.667 68.167,85  "/>
	      </g>
	    </svg>
			
	    <h2>About</h2>
		<p>Stitch uses a combination of virtual reality, audio spatialisation and simple 3D shapes to create soundscapes. As the shapes move around you, your goal is to play and loop them to create different beats and environments.</p>

		<h2>Process</h2>
		<p>Stitch was imagined and brought to life as a student project for <a href='http://dwm.re' target='_blank'>DWM</a>. The main idea behind the project was to take part in the arisen of virtual reality on the web and as such, the whole project is open source and can be forked on <a href='https://github.com/clementGir/Stitch' target='_blank'>github</a>.</p>
	</div>
</section>

<!-- SCRIPTS -->
<script src="assets/js/libraries.min.js"></script>
<script src="assets/js/home.min.js"></script>