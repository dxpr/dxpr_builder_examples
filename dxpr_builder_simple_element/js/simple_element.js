/* global FILE_UPLOAD_MAX_SIZE */

(function ($) {
  window.dxprBuilder.dxpr_elements.push({
    base: "simple_element",
    name: Drupal.t("Simple Element"),
    icon: "et et-icon-video",
    params: [
      {
        type: "video",
        heading: Drupal.t("Video"),
        description: Drupal.t(
          "Allowed files: MP4, WEBM, OGG, OGV. Max size: @FILE_UPLOAD_MAX_SIZE MB",
          { "@FILE_UPLOAD_MAX_SIZE": FILE_UPLOAD_MAX_SIZE },
        ),
        param_name: "video",
      },
      {
        type: "image",
        heading: Drupal.t("Cover image"),
        param_name: "image",
      },
      {
        type: "checkbox",
        heading: Drupal.t("Controls"),
        param_name: "controls",
        value: {
          controls: Drupal.t("Yes"),
        },
      },
      {
        type: "textfield",
        heading: Drupal.t("Video width"),
        param_name: "width",
        description: Drupal.t("For example 100px, or 50%."),
        value: "100%",
      },
      {
        type: "dropdown",
        heading: Drupal.t("Example multi select small"),
        param_name: "example_dropdown",
        value: {
          "": Drupal.t("None"),
          "ex1": Drupal.t("Example value 1"),
          "ex2": Drupal.t("Example value 2"),
        },
      },
      {
        type: "dropdown",
        heading: Drupal.t("Example multi select large"),
        param_name: "example_dropdown",
        value: {
          "": Drupal.t("None"),
          "ex1": Drupal.t("Example value 1"),
          "ex2": Drupal.t("Example value 2"),
          "ex3": Drupal.t("Example value 3"),
          "ex4": Drupal.t("Example value 4"),
          "ex5": Drupal.t("Example value 5"),
          "ex6": Drupal.t("Example value 6"),
          "ex7": Drupal.t("Example value 7"),
        },
      },
      {
        type: "bootstrap_slider",
        heading: Drupal.t("Example slider"),
        param_name: "items",
        min: "1",
        max: "10",
        value: "1",
      },
      {
        type: "colorpicker",
        heading: Drupal.t("Example colorpicker"),
        param_name: "example_colorpicker",
      },
      {
        type: "icon",
        heading: Drupal.t("Example Icon"),
        param_name: "example_icon",
      },
      {
        type: "datetime",
        heading: Drupal.t("Example datetime"),
        param_name: "example_datetime",
        timepicker: true,
        datepicker: true,
        formatDate: "d.m.Y",
        formatTime: "H",
      },
      {
        type: "html",
        heading: Drupal.t("Example HTML"),
        param_name: "example_html",
        value: Drupal.t("<p>Click the edit button to change this HTML</p>"),
      },
      {
        type: "textarea",
        heading: Drupal.t("Example textarea"),
        param_name: "example_textarea",
        value: Drupal.t(
          "This is a placeholder text. Your actual content will go here. Edit this to include your own information.",
        ),
      },
    ],
    show_settings_on_create: true,
    render(...args) {
      this.dom_element = $(
        `<div class="az-element az-video ${this.get_el_classes()}"></div>`,
      );
      const content_classes = this.get_content_classes();
      const mute = this.attrs.autoplay ? "muted" : this.attrs.mute;
      const video = $(
        `<video class="az-video-content ${content_classes}" src="${this.attrs.video}" ${this.attrs.autoplay} ${mute} ${this.attrs.controls} ${this.attrs.loop}>`,
      );

      if (this.attrs.style) {
        video.attr("style", this.attrs.style);
      }
      if (this.attrs.width) {
        video.attr("width", this.attrs.width);
      }
      if (this.attrs.image) {
        video.attr("poster", this.attrs.image);
      }
      $(video).appendTo(this.dom_element);
      this.baseclass.prototype.render.apply(this, args);
    },
  });
})(window.jQuery);
