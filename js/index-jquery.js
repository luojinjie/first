//jquery模块（后续才学习到jquery，再加入一些效果）
$(document).ready(function(){
	var $Nav = $(".nav").offset().top;
	function ScrollTop(){
		var $sT = $(document).scrollTop();
		//滚动到一定位置显示回到顶部
		if($sT>=500){
			$("#go-top").css("display","block");
		}else{
			$("#go-top").css("display","none");
		}
		//滚动到导航的位置时，使其固定在顶部显示
		if($sT>=$Nav){
			$(".nav").addClass("be-top");
		}else{
			$(".nav").removeClass("be-top");
		}
	}
	var $getTop = setInterval(ScrollTop,100);
	
	//点击回到顶部
	$("#go-top").on("click",function(){
		$(document).scrollTop(0);
	})
	
	//隐藏事件beHide
	function beHide(){
		$(".overlay").remove();
		$(".login-form").remove();
		$(".register-form").remove();
	}
	
	//登录成功后改变为用户信息+时间段
	function welcome(u){
		var $welcome = null,
		timer = null,
		date = new Date().getHours();
		if(date>6&&date<12){
			timer = "早上好！";
		}else if(date>=12&&date<18){
			timer = "下午好！";
		}else{
			timer = "晚上好！";
		}
		$welcome = '<span class="timer">' + timer + '</span>' + '<span class="user">' + u + '</span>';
		$(".top-login").html($welcome)
	}
	
	//点击登录(注册)时弹出蒙板、登录窗(注册窗)并通过data()实现注册登录
	var $overlay = '<div class="overlay"></div>'
	$(".login").on("click",function(){
		var $loginForm = '<div class="login-form">'
		+ '	<div class="login-head">会员登录<i class="login-close"></i></div>'
		+ '	<div class="login-body">'
		+ '		<form id="loginform">'
		+ '			<ul>'
		+ '				<li>'
		+ '					<label>'
		+ '						<span>用户名:</span>'
		+ '						<input type="text" name="login-username" id="login-username" placeholder="请输入2-10位字符" />'
		+ '					</label>'
		+ '				</li>'
		+ '				<li>'
		+ '					<label>'
		+ '						<span>密　码:</span>'
		+ '						<input type="password" name="login-password" id="login-password" placeholder="请输入6-18位字符" />'
		+ '					</label>'
		+ '				</li>'
		+ '			</ul>'
		+ '			<span class="login-error"></span>'
		+ '			<input class="submit-btn" type="submit" value="提交" /><input class="reset-btn" type="reset" value="重置" />'
		+ '		</form>'
		+ '	</div>'
		+ '</div>';
		$("body").append($overlay);
		$("body").append($loginForm);
		
		//利用validate插件验证登录
		var validator = $("#loginform").validate({
			debug:true,
			rules:{
				"login-username":{
					required:true,
					minlength:2,
					maxlength:10
				},
				"login-password":{
					required:true,
					minlength:6,
					maxlength:18
				}
			},
			messages:{
				"login-username":{
					required:"请输入2-10位字符",
					minlength:"最少输入{0}位字符",
					maxlength:"最多输入{0}位字符"
				},
				"login-password":{
					required:"请输入6-18位字符",
					minlength:"最少输入{0}位字符",
					maxlength:"最多输入{0}位字符"
				}
			},
			errorLabelContainer:$(".login-error"),
			submitHandler:function(form){
				//验证成功后核对信息
				var $username = $("#login-username").val(),
				$password = $("#login-password").val();
				if($(".memory").data("username")===$username){
					if($(".memory").data("password")===$password){
						alert("登录成功！");
						beHide();
						welcome($username);
					}else{
						alert("密码错误！");
					}
				}else{
					alert("用户名不存在！");
				}
				//form.submit(); //要加上表单提交的函数，否则表单不会提交。此处需要忽略提交
			}
		})
		
		$(".reset-btn").click(function(){
			validator.resetForm();
		})
		
		//调整窗口位置至中间
		$(".login-form").css("top",function(){
			var $t = parseFloat($(".login-form").css("top")),
			$h = parseFloat($(".login-form").css("height")),
			$T = $t - ($h/2);
			return $T;
		})
		$(".login-form").css("left",function(){
			var $l = parseFloat($(".login-form").css("left")),
			$w = parseFloat($(".login-form").css("width")),
			$L = $l - ($w/2);
			return $L;
		})
		
		//触发蒙板、注册窗的隐藏事件beHide
		$(".overlay").on("click",beHide);
		$(".login-close").on("click",beHide);
	})
		$(".register").on("click",function(){
		var $registerForm = '<div class="register-form">'
		+ '	<div class="register-head">会员注册<i class="register-close"></i></div>'
		+ '	<div class="register-body">'
		+ '		<form id="registerform">'
		+ '			<ul>'
		+ '				<li>'
		+ '					<label>'
		+ '						<span>用户名:</span>'
		+ '						<input type="text" name="register-username" id="register-username" placeholder="请输入2-10位字符" />'
		+ '					</label>'
		+ '				</li>'
		+ '				<li>'
		+ '					<label>'
		+ '						<span>密　码:</span>'
		+ '						<input type="password" name="register-password" id="register-password" placeholder="请输入6-18位字符" />'
		+ '					</label>'
		+ '				</li>'
		+ '				<li>'
		+ '					<label>'
		+ '						<span>确认密码:</span>'
		+ '						<input type="password" name="register-confirm-password" placeholder="请再次输入密码" />'
		+ '					</label>'
		+ '				</li>'
		+ '			</ul>'
		+ '			<span class="register-error"></span>'
		+ '			<input class="submit-btn" type="submit" value="提交" /><input class="reset-btn" type="reset" value="重置" />'
		+ '		</form>'
		+ '	</div>'
		+ '</div>';
		$("body").append($overlay);	
		$("body").append($registerForm);
		
		//利用validate插件验证注册
		var validator = $("#registerform").validate({
			debug:true,
			rules:{
				"register-username":{
					required:true,
					minlength:2,
					maxlength:10
				},
				"register-password":{
					required:true,
					minlength:6,
					maxlength:18
				},
				"confirm-password":{
					equalTo:"#password"
				}
			},
			messages:{
				"register-username":{
					required:"请输入2-10位字符",
					minlength:"最少输入{0}位字符",
					maxlength:"最多输入{0}位字符"
				},
				"register-password":{
					required:"请输入6-18位字符",
					minlength:"最少输入{0}位字符",
					maxlength:"最多输入{0}位字符"
				},
				"confirm-password":{
					equalTo:"与上面密码输入的不同！"
				}
			},
			errorLabelContainer:$(".register-error"),
			submitHandler:function(form){
				//验证成功后把用户名跟密码存储在div上用于登录
				var $username = $("#register-username").val(),
				$password = $("#register-password").val();
				$(".memory").data({"username":$username,"password":$password});
				//form.submit(); //要加上表单提交的函数，否则表单不会提交。此处需要忽略提交
				alert("注册成功！");
				beHide();
				$(".login").click()
			}
		})
		
		$(".reset-btn").click(function(){
			validator.resetForm();
		})

		//调整窗口位置至中间
		$(".register-form").css("top",function(){
			var $t = parseFloat($(".register-form").css("top")),
			$h = parseFloat($(".register-form").css("height")),
			$T = $t - ($h/2);
			return $T;
		})
		$(".register-form").css("left",function(){
			var $l = parseFloat($(".register-form").css("left")),
			$w = parseFloat($(".register-form").css("width")),
			$L = $l - ($w/2);
			return $L;
		})
		//触发蒙板、登录窗的隐藏事件beHide
		$(".overlay").on("click",beHide);
		$(".register-close").on("click",beHide);	
	})
	
	
	var $time = null;
	//显示或隐藏tips的函数
	function changeLeft(target){
		clearInterval($time);
		$time = setInterval(function(){
			var $Left = parseInt($(".tips").css("left")),
			speed = (target - $Left)/10,
			text = null;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if($Left==target){
				clearInterval($time);
				if($(".to-hide").attr("class")=="to-hide"){
					$(".to-hide").toggleClass("no-see");
					$(".to-show").toggleClass("no-see");
				}else{
					$(".to-show").toggleClass("no-see");
					$(".to-hide").toggleClass("no-see");
				}
			}else{
				$(".tips").css("left",$Left + speed);
			}
		},30)
	}
	
	$(".to-hide").on("click",function(){
		changeLeft(-246);
	})
	$(".to-show").on("click",function(){
		changeLeft(0);
	})
})