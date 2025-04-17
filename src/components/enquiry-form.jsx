import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarLoader } from "react-spinners";

import { supabase } from "@/utils/supabaseE"; // static supabase client

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  companyName: z.string().min(1, "Company name is required"),
  designation: z.string().min(1, "Designation is required"),
  phNo: z.string().min(1, "Phone number is required"),
  eMail: z.string().email("Invalid email"),
  companySize: z.string().min(1, "Company size is required"),
  industry: z.string().min(1, "Industry is required"),
  serviceRequired: z.string().min(1, "Service is required"),
  notes: z.string().optional(),
  hearAbtUs: z.string().optional(),
});

export default function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" or "error"
  const [formClosed, setFormClosed] = useState(false); // Track form visibility

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("employerEnquery").insert([
        {
          name: data.name,
          companyName: data.companyName,
          designation: data.designation,
          phNo: data.phNo,
          eMail: data.eMail,
          companySize: data.companySize,
          industry: data.industry,
          serviceRequired: data.serviceRequired,
          notes: data.notes,
          hearAbtUs: data.hearAbtUs,
        },
      ]);

      if (error) {
        console.error("Insert error:", error);
        setPopupMessage("Something went wrong. Please try again.");
        setPopupType("error");
      } else {
        setPopupMessage("Enquiry submitted successfully!");
        setPopupType("success");
        reset();
      }
    } catch (err) {
      console.error("Unexpected error: ", err);
      setPopupMessage("Unexpected error occurred.");
      setPopupType("error");
    } finally {
      setLoading(false);
      setShowPopup(true); // Show popup after form submission
      setFormClosed(true); // Close the form after submission
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div>
      {!formClosed && ( // Only show the form if it's not closed
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4 p-6">
          <Input placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <Input placeholder="Company Name" {...register("companyName")} />
          {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}

          <Input placeholder="Designation" {...register("designation")} />
          {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}

          <Input placeholder="Phone Number" {...register("phNo")} />
          {errors.phNo && <p className="text-red-500">{errors.phNo.message}</p>}

          <Input placeholder="Email" {...register("eMail")} />
          {errors.eMail && <p className="text-red-500">{errors.eMail.message}</p>}

          <Controller
            name="companySize"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Company Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.companySize && <p className="text-red-500">{errors.companySize.message}</p>}

          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Aerospace & Defense">Aerospace & Defense</SelectItem>
                    <SelectItem value="Agriculture & Food Processing">Agriculture & Food Processing</SelectItem>
                    <SelectItem value="Automotive & Mobility Solutions">Automotive & Mobility Solutions</SelectItem>
                    <SelectItem value="Banking, Financial Services & Insurance (BFSI)">
                      Banking, Financial Services & Insurance (BFSI)
                    </SelectItem>
                    <SelectItem value="Blockchain, AI & Emerging Technologies">
                      Blockchain, AI & Emerging Technologies
                    </SelectItem>
                    <SelectItem value="BPO, KPO & Outsourcing Services">BPO, KPO & Outsourcing Services</SelectItem>
                    <SelectItem value="Cybersecurity & Data Protection">Cybersecurity & Data Protection</SelectItem>
                    <SelectItem value="Education & EdTech">Education & EdTech</SelectItem>
                    <SelectItem value="Entertainment, Gaming & Animation">Entertainment, Gaming & Animation</SelectItem>
                    <SelectItem value="Facilities Management & Security Services">
                      Facilities Management & Security Services
                    </SelectItem>
                    <SelectItem value="FMCG (Fast-Moving Consumer Goods)">FMCG (Fast-Moving Consumer Goods)</SelectItem>
                    <SelectItem value="Healthcare & Pharmaceuticals">Healthcare & Pharmaceuticals</SelectItem>
                    <SelectItem value="HR Consulting & Recruitment Services">HR Consulting & Recruitment Services</SelectItem>
                    <SelectItem value="Information Technology (IT) & Software Development">
                      Information Technology (IT) & Software Development
                    </SelectItem>
                    <SelectItem value="Logistics, Supply Chain & Transportation">
                      Logistics, Supply Chain & Transportation
                    </SelectItem>
                    <SelectItem value="Manufacturing & Engineering">Manufacturing & Engineering</SelectItem>
                    <SelectItem value="Media, Advertising & Digital Marketing">Media, Advertising & Digital Marketing</SelectItem>
                    <SelectItem value="Printing, Publishing & Media Houses">Printing, Publishing & Media Houses</SelectItem>
                    <SelectItem value="Real Estate & Construction">Real Estate & Construction</SelectItem>
                    <SelectItem value="Retail & E-commerce">Retail & E-commerce</SelectItem>
                    <SelectItem value="Telecommunications">Telecommunications</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.industry && <p className="text-red-500">{errors.industry.message}</p>}

          <Controller
            name="serviceRequired"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Service Required" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Recruitment Process Outsourcing">Recruitment Process Outsourcing</SelectItem>
                    <SelectItem value="Niche/Experienced Hiring">Niche/Experienced Hiring</SelectItem>
                    <SelectItem value="Job Posting/Candidate Database Services">Job Posting/Candidate Database Services</SelectItem>
                    <SelectItem value="Workforce Auditing/HR Auditing">Workforce Auditing/HR Auditing</SelectItem>
                    <SelectItem value="Contract Staffing">Contract Staffing</SelectItem>
                    <SelectItem value="Bulk Hiring">Bulk Hiring</SelectItem>
                    <SelectItem value="Payroll Assistance">Payroll Assistance</SelectItem>
                    <SelectItem value="Marketing Solutions for Talent Acquisition">Marketing Solutions for Talent Acquisition</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.serviceRequired && <p className="text-red-500">{errors.serviceRequired.message}</p>}

          <Textarea placeholder="Notes" {...register("notes")} />
          {errors.notes && <p className="text-red-500">{errors.notes.message}</p>}

          <Controller
            name="hearAbtUs"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="How did you hear about us?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Google Search">Google Search</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Referral (Friend/Colleague)">Referral (Friend/Colleague)</SelectItem>
                    <SelectItem value="Email Newsletter">Email Newsletter</SelectItem>
                    <SelectItem value="WhatsApp Message">WhatsApp Message</SelectItem>
                    <SelectItem value="Attended a Webinar/Event">Attended a Webinar/Event</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.hearAbtUs && <p className="text-red-500">{errors.hearAbtUs.message}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <BarLoader color="#fff" height={4} width={100} /> : "Submit"}
          </Button>
        </form>
      )}

      {showPopup && (
        <div className={`popup ${popupType === "success" ? "popup-success" : "popup-error"}`}>
          <p>{popupMessage}</p>
          <Button onClick={closePopup}>Close</Button>
        </div>
      )}
    </div>
  );
}

