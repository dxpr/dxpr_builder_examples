if (!window.dxprBuilder) {
  window.dxprBuilder = {};
}
if (!window.dxprBuilder.dxpr_elements) {
  window.dxprBuilder.dxpr_elements = [];
}

window.dxprBuilder.dxpr_elements.push({base: "az_dyn_dynamic_element",
showed(...args) {
      this.baseclass.prototype.showed.apply(this, args);
      const element = this;
      this.add_js_list({
        paths: [
          "vendor/managed/jquery-countTo/jquery.countTo.js",
          "vendor/managed/waypoints/lib/jquery.waypoints.min.js",
        ],
        loaded: "waypoint" in $.fn && "countTo" in $.fn,
        callback() {
          $(element.dom_element).waypoint(
            (direction) => {
              element.dom_element.find(`#${element.id}`).countTo({
                from: Math.round(element.attrs.pt_start),
                to: Math.round(element.attrs.pt_end),
                speed: Math.round(element.attrs.pt_speed),
                refreshInterval: 50,
                seperator: element.attrs.pt_separator,
                formatter(value, options) {
                  return (
                    element.attrs.pt_prefix +
                    value
                      .toFixed(0)
                      .replace(/\B(?=(?:\d{3})+(?!\d))/g, options.seperator) +
                    element.attrs.pt_postfix
                  );
                },
              });
            },
            {
              offset: "100%",
              handler(direction) {
                this.destroy();
              },
            },
          );
          document.dispatchEvent(new Event("scroll"));
        },
      });
    },
params: [{"param_name":"pt_start","value":"0"},{"param_name":"pt_end","value":"100"},{"param_name":"fontsize","value":"30"},{"param_name":"pt_speed","value":"2000"},{"param_name":"pt_seperator","value":""},{"param_name":"pt_prefix","value":""},{"param_name":"pt_postfix","value":""},{"param_name":"an_start","value":""},{"param_name":"an_in","value":""},{"param_name":"an_out","value":""},{"param_name":"an_hidden","value":""},{"param_name":"an_infinite","value":""},{"param_name":"an_offset","value":"100"},{"param_name":"an_duration","value":"1000"},{"param_name":"an_in_delay","value":"0"},{"param_name":"an_out_delay","value":"0"},{"param_name":"an_parent","value":"1"},{"param_name":"an_name","value":""},{"param_name":"box_model","value":""},{"param_name":"hash","value":""},{"param_name":"el_class","value":""},{"param_name":"style","value":""},{"param_name":"shadow","value":"0"},{"param_name":"hover_style","value":""},{"param_name":"hover_shadow","value":"0"},{"param_name":"pos_left","value":""},{"param_name":"pos_right","value":""},{"param_name":"pos_top","value":""},{"param_name":"pos_bottom","value":""},{"param_name":"pos_width","value":""},{"param_name":"pos_height","value":""},{"param_name":"pos_zindex","value":""}],
});
