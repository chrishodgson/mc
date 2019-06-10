export default [
  [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Your name",
      formGroupClass: "col-sm-12"
    }
  ],
  [
    {
      name: "challenge",
      label: "Challenge",
      type: "select",
      required: true,
      formGroupClass: "col-sm-6"
    },
    {
      name: "startDate",
      label: "Date",
      type: "date",
      required: true,
      showTime: false,
      placeholder: "Enter a date",
      formGroupClass: "col-sm-6"
    },  
  ],
  [
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: false,
      formGroupClass: "col-sm-12"
    }  
  ]
];