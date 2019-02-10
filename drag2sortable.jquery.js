(function( factory ) {
	if (typeof(require) === 'function') {
		module.exports = factory(jQuery);
	} else {
		factory(jQuery);
	}
})(function( $ ) {
	var _this, _substitute, _defaults = {}, _isDrag = false;

	function Position(event) {
		var _thisPos = this, _event = event;
		this.X = _event.clientX;
		this.Y = _event.clientY;
		this.get = function() {
			return {X: _thisPos.X, Y:_thisPos.Y};
		};

		this.init = function(X, Y) {
			_thisPos.X = X;
			_thisPos.Y = Y;
		}
 	}

 	function Movement(target) {
 		var _thisMovement = this, _target = target, _current = {};
 		function delta(pos) {
 			var _newpos = pos.get();
 			return {
 				X: _newpos.X - _current.X,
 				Y: _newpos.Y - _current.Y,
 			}
 		};

 		function increase(delta) {
 			_target.css('left', parseInt(_target.css('left')) + delta.X);
 			_target.css('top', parseInt(_target.css('top')) + delta.Y);
 		}

 		this.move = function(pos, callback) {
 			increase(delta(pos));
 			_current.X = pos.get().X;
 			_current.Y = pos.get().Y;
 			if (typeof callback === 'function') {
 				callback.call(_target);
 			}
 		};

 		this.init = function(pos, X, Y) {
 			if (typeof X === 'undefined') {
 				_current.X = _target.offset().left;
 			}

 			if (typeof Y === 'undefined') {
 				_current.Y = _target.offset().top;
 			}

 			_target.css('position', 'absolute');
 			pos.init(X, Y);
 			_thisMovement.move(pos);
 		}
 	}
 
	$.fn.drag2sortable = function(params) {
		_this = this;
		$.extend(_defaults, params);
		if (!_this.is('ul')) {
			return _this;
		}
		_this.find('li').each(function() {
			var _thisLi = $(this);
			_thisLi.on('mousedown', function(e) {
				if (_isDrag) return;
				_isDrag = true;
				_thisLi.css({'cursor': 'grabbing'});
				_substitute = _thisLi.clone()
									 .css({
									 	'position': 'absolute',
									 	'left': _thisLi.position().left,
									 	'top': _thisLi.position().top,
									 	'cursor': 'grabbing',
									 	'width': _thisLi.outerWidth(false),
									 }).insertAfter(_thisLi);
				_Movement = new Movement(_substitute);
				_Movement.init(new Position(e));
				_thisLi.addClass('sortable-placeholder').css('visibility', 'hidden');
				_this.off('mousemove').off('mouseup')
				.on('mousemove', function(e) {
					if (!_isDrag) return;
					if (typeof _defaults.onMove === 'function') {
						_Movement.move(new Position(e), _defaults.onMove);
					} else {
						_Movement.move(new Position(e));
					}

					_this.find('li').not('.sortable-placeholder').each(function() {
						var _thisElm = $(this),
							_substituteTop = parseInt(_substitute.css('top')),
							_substituteLeft = parseInt(_substitute.css('left'));
						if ( (_substituteLeft > _thisElm.position().left && _substituteLeft < _thisElm.position().left + _thisElm.outerWidth(false)) && 
							 (_substituteTop > _thisElm.position().top && _substituteTop < _thisElm.position().top + _thisElm.outerHeight(false))) {
							if (_thisElm.is(':first-child')) {
								_thisLi.insertBefore(_thisElm);
							} else {
								_thisLi.insertAfter(_thisElm);
							}
						}
					});
				}).on('mouseup', function(e) {
					if (!_isDrag) return;
					_isDrag = false;
					_substitute.animate({
						'position': 'absolute',
					 	'left': _thisLi.position().left,
					 	'top': _thisLi.position().top,
					}, 150, function() {
						_thisLi.css({'visibility': '', 'position': ''})
							   .removeClass('sortable-placeholder');
						_substitute.remove();
						if (typeof _defaults.onSorted === 'function') {
							_defaults.onSorted.call(_thisLi);
						}
					});
				});
			});
		}).on('mouseenter', function() {
			var _thisLi = $(this);
			_thisLi.css({'cursor': 'grab'});
		});
	}
});