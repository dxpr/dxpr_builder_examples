/* global Drupal */

/**
 * @file
 * Defines a new dynamic counter element for DXPR Builder.
 *
 * This script adds a dynamic counter element to the DXPR Builder's UI that
 * updates its display in real-time when the webpage is viewed. It demonstrates
 * the handling of dynamic elements that need special backend processing by DXPR
 * Builder. This element uses 'pt_' prefix for parameter names to indicate that
 * these parameters should be passed through without filtering by DXPR Builder.
 */

(function ($, document) {
  // Registers a new dynamic counter element in DXPR Builder's list of elements.
  window.dxprBuilder.dxpr_elements.push({
    base: "az_dyn_dynamic_element", // Must start with 'az_dyn_' indicating a dynamic element.
    name: Drupal.t("Dynamic Element"), // Human-readable name of the element.
    nameEn: "Dynamic Element", // Non-translatable English name of the element.
    icon: "et et-icon-hourglass", // Icon class for the element, shown in the UI.

    // Describes the properties that can be configured for this dynamic element.
    params: [
      {
        type: "textfield",
        heading: Drupal.t("Start"),
        param_name: "pt_start", // 'pt_' prefix to avoid data filtering by DXPR Builder.
        description: Drupal.t("Enter the number to start counting from."),
        value: "0",
      },
      {
        type: "textfield",
        heading: Drupal.t("End"),
        param_name: "pt_end",
        description: Drupal.t("Enter the number to count up to."),
        value: "100",
      },
      {
        type: "bootstrap_slider",
        heading: Drupal.t("Font size"),
        param_name: "fontsize", // Non-passthrough parameter
        max: "200",
        description: Drupal.t("Select the font size for the counter number."),
        value: "30",
        formatter: true,
      },
      {
        type: "bootstrap_slider",
        heading: Drupal.t("Speed"),
        param_name: "pt_speed",
        max: "10000",
        description: Drupal.t("Select the speed in ms for the counter to finish."),
        value: "2000",
      },
      {
        type: "dropdown",
        heading: Drupal.t("Thousands separator"),
        param_name: "pt_separator",
        description: Drupal.t("Select a character to separate thousands in the end number."),
        value: {
          "": Drupal.t("None"),
          ",": Drupal.t("Comma"),
          ".": Drupal.t("Dot"),
          " ": Drupal.t("Space"),
        },
      },
      {
        type: "textfield",
        heading: Drupal.t("Prefix"),
        param_name: "pt_prefix",
        description: Drupal.t("Enter any character to be shown before the number (i.e. $)."),
      },
      {
        type: "textfield",
        heading: Drupal.t("Suffix"),
        param_name: "pt_postfix",
        description: Drupal.t("Enter any character to be shown after the number (i.e. %)."),
      },
    ],
    show_settings_on_create: true, // Determines whether settings modal is displayed when the element is added.

    // Function that fires each time the webpage containing this element is viewed.
    showed(...args) {
      this.baseclass.prototype.showed.apply(this, args);
      const element = this;
      // Loads additional JavaScript libraries required for dynamic behaviors.
      this.add_js_list({
        paths: [
          "vendor/managed/jquery-countTo/jquery.countTo.js",
          "vendor/managed/waypoints/lib/jquery.waypoints.min.js",
          "/modules/custom/dxpr_builder_dynamic_element/js/test.js",
        ],
        loaded: "waypoint" in $.fn && "countTo" in $.fn,
        callback() {
          // Initialize the dynamic counter functionality.
          $(element.dom_element).waypoint({
            handler: function (direction) {
              element.dom_element.find(`#${element.id}`).countTo({
                from: Math.round(element.attrs.pt_start),
                to: Math.round(element.attrs.pt_end),
                speed: Math.round(element.attrs.pt_speed),
                refreshInterval: 50,
                separator: element.attrs.pt_separator,
                formatter(value, options) {
                  return (
                    element.attrs.pt_prefix +
                    value.toFixed(0).replace(/\B(?=(?:\d{3})+(?!\d))/g, options.separator) +
                    element.attrs.pt_postfix
                  );
                },
              });
              this.destroy();
            },
            offset: '100%',
          });
          // Trigger scroll to ensure waypoints are initialized.
          document.dispatchEvent(new Event("scroll"));
        },
      });
    },

    // Render function to generate initial HTML structure of the element.
    render(...args) {
      const state = {
        id: this.id,
        class: `${this.get_el_classes()} ${this.get_content_classes()}`,
        style: `${this.attrs.style} font-size: ${this.attrs.fontsize}px;`,
        start: this.attrs.start,
      };

      // Render the element template with provided state parameters.
      this.dom_element = $(
        this.baseclass.prototype.render_template("elements/counter/counter", state)
      );
      this.baseclass.prototype.render.apply(this, args);
    },
  });
})(window.jQuery, window.document);
