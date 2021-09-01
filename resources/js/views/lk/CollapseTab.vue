<template lang="html">
  <div class="page">
    <div class="accordion" id="accordion">
    	<div class="accordion-item">
    		<h3 class="accordion-item-head" @click="accordion">
    			Первый пункт
    		</h3>
    		<div class="accordion-item-body">
    			<p>
    			Кто, по-вашему, этот мощный старик? Не говорите, вы не можете этого знать. Это — гигант мысли, отец русской демократии и особа, приближенная к императору.
    			</p>
    		</div>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    accordion: function (event) {

       //Раскомментировать, если нужно, чтобы закрывались остальные пункты при открытии текущего
      // 	var matches = document.querySelectorAll('.accordion-item-head');
      //  	for(var i = 0; i < matches.length; i++) {
      //  		matches[i].classList.remove('active');
      //	 }
          event.target.classList.toggle('active');
       }
  }
}

</script>

<style lang="css" scoped>
.page{
	max-width: 800px;
	margin: 0 auto;
}

.accordion-item{
	position: relative;
}

.accordion-item-head{
	background-color: transparent;
	border-top-left-radius: 5px ;
	border-top-right-radius: 5px;
	cursor: pointer;
	padding:10px;
}


.accordion-item-head:before{
	content: ' > ';
	display: block;
	height: 29px;
	position: absolute;
	right: 25px;
	transform: rotate(90deg) scaleY(2);
	top: 8px;
}

.accordion-item-head.active:before{
	content: ' < ';
}


.accordion-item-body{
	display: none;
}
.accordion-item-head.active + .accordion-item-body{
	display: block !important;
}
</style>
