const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  jobID: { type: String, required: true },
  jobCompanyId: { type: String, required: true },  // companyId -> jobCompanyId
  jobTitle: { type: String, required: true },
  jobCompanyName: { type: String, required: true },  // companyName -> jobCompanyName
  jobSalary: { type: String, required: true },  // lương
  jobLocation: { type: String, required: true },  // 
  jobUpdatedDate: { type: Date, required: true },  // updatedDate -> jobUpdatedDate
  jobTags: { type: [String], required: true },  // tags -> jobTags
  jobCompanyLogo: { type: String, required: true },  // companyLogo -> jobCompanyLogo
  jobDescription: { type: String, required: true },
  jobRequirements: { type: [String], required: true },  // requirements -> jobRequirements
  jobApplicationDeadline: { type: Date, required: true },  // applicationDeadline -> jobApplicationDeadline
  jobIndustry: { type: String, required: false }, // ngành nghề
  jobLevel: { type: String, required: false },    // caap61 bậc
  jobField: { type: String, required: false },    // lĩnh vực
  jobSkills: { type: [String], required: false }, // kỉ năng
  jobVacancyCount: { type: Number, required: false }, // số lượng yêu cầu
  jobAddress: { type: String, required: false } // địa chỉ làm việc
});

module.exports = mongoose.model('Job', jobSchema);
