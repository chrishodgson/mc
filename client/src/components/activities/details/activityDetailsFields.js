export default [
  [
    {
      name: "title",
      label: "Your title",
      type: "text",
      required: true,
      placeholder: "Enter a title",
      formGroupClass: "col-sm-12"
    }
  ],
  [
    {
      name: "userChallengeId",
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