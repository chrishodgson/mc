export default [
  [
    {
      name: "name",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "Enter a title",
      formGroupClass: "col-sm-12"
    }
  ],
  [
    {
      name: "challenge",
      label: "Select the Challenge",
      type: "select",
      required: true,
      formGroupClass: "col-sm-6"
    },
    {
      name: "startDate",
      label: "Date of the activity",
      type: "date",
      required: true,
      showTime: false,
      //placeholder: "Enter a date",
      formGroupClass: "col-sm-6"
    },  
  ],
  [
    {
      name: "description",
      label: "Your description",
      type: "textarea",
      required: false,
      formGroupClass: "col-sm-12"
    }  
  ]
];