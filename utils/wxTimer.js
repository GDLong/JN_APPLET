var second = 60;
function countdown(that) {
  if (second == 0) {
    that.setData({
      clock: "60秒倒计时结束"
    });
    return;
  }
  var time = setTimeout(function () {
    second--;
    that.setData({
      clock: second
    });
    countdown(that);
  }
    , 1000)
}

module.exports = {
  count_down: countdown
}