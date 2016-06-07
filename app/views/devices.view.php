<!-- Header -->
<header>
	<a class='homeLink' href="?p=">
		<p>stitch</p>
	</a>
</header>

<!-- Devices -->
<section class="section--devices">
	<div class="container">

		<h2><span>Choose your device</span></h2>
		<p class="notice"><span>Stitch is intended for virtual reality but it may be tried with:</span></p>
		
		<ul>
			<!-- Cardboard -->
			<li>
				<div class="top">
					<?php echo file_get_contents("assets/img/svg/cardboard.svg"); ?>
					<h3>Cardboard</h3>
				</div>

				<div class="bottom">
					<p class="setup">Android</p>
					<div>					
						<p>Go to goo.gl/1ioCrA</p>
						<img src="assets/img/qrcodes/cardboard.png" alt="">
					</div>	
					<a class="vr tour appLink"> 
					    <span>
							<?php echo file_get_contents("assets/img/svg/arrow.svg"); ?>
					    </span> 
					</a>
				</div>			
			</li>

			<!-- Gyroscope -->
			<li>	
				<div class="top">
					<img class="icon icon--gyro" src="assets/img/svg/device.png" alt="">
					<h3>Gyroscope</h3>
				</div>

				<div class="bottom">
					<p class="setup">Android, iOs</p>
					<div>
						<p>Go to goo.gl/9nseFV</p>
						<img src="assets/img/qrcodes/gyro.png" alt="">
					</div>
					<a class="gyro tour appLink"> 
					    <span>
							<?php echo file_get_contents("assets/img/svg/arrow.svg"); ?>
					    </span> 
					</a>
				</div>
			</li>
			
			<!-- Desktop -->
			<li>
				<div class="top">
					<?php echo file_get_contents("assets/img/svg/desktop.svg"); ?>			
					<h3>Computer</h3>
				</div>

				<div class="bottom">
					<p class="setup">Chrome, Firefox, Safari</p>
					<div>
						<p>Go to goo.gl/kdGyKz</p>
					</div>
					<a class="computer tour appLink"> 
					    <span>
							<?php echo file_get_contents("assets/img/svg/arrow.svg"); ?>
					    </span> 
					</a>
				</div>
			</li>

			<!-- Occulus -->
			<li>
				<div class="top">
					<?php echo file_get_contents("assets/img/svg/vr.svg"); ?>
					<h3>VR devices</h3>
				</div>
				
				<div class="bottom">
					<p class="setup">Optimised for Occulus</p>
					<div>
						<p>Go to goo.gl/kdGyKz</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</section>

<!-- SCRIPTS -->
<script src="assets/js/libraries.min.js"></script>
<script src="assets/js/devices.min.js"></script>