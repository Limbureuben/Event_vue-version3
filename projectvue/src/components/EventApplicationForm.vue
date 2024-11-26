<template>
  <div class="application-form-overlay" @click="$emit('close')">
    <div class="application-form" @click.stop>
      <button class="close-button" @click="$emit('close')">X</button>
      <h3>Apply for {{ event.eventName }}</h3>
      <form @submit.prevent="submitApplication">
        <input type="text" id="name" v-model="applicationData.name" placeholder="Enter name" required />
        <input type="email" id="email" v-model="applicationData.email" placeholder="Email" required />
        <select id="status" v-model="applicationData.status" required>
          <option disabled value="">Select status</option>
          <option value="attendee">Attendee</option>
          <option value="Speaker">Speaker</option>
          <option value="interested">Interested</option>
        </select>
        <button type="submit" class="submit-button">Submit Application</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
// import { nextTick } from 'vue';

export default {
  name: "EventApplicationForm",
  props: ["event"],
  data() {
    return {
      applicationData: {
        name: "",
        email: "",
        status: ""
      }
    };
  },
  methods: {
  async submitApplication() {
    const mutation = `
      mutation CreateEventApplication($input: EventApplicationInputObject!) {
        createEventApplication(input: $input) {
          message
          success
          ticketPdf
          application {
            email
            eventId
            name
            status
          }
        }
      }
    `;

    const variables = {
      input: {
        name: this.applicationData.name,
        email: this.applicationData.email,
        status: this.applicationData.status,
        eventId: this.event.id
      }
    };

    try {
  const response = await axios.post('http://localhost:8000/graphql/', {
    query: mutation,
    variables: variables
  });

  // Inspect response data
  console.log("Full response:", response);
  const data = response.data?.data?.createEventApplication;
  console.log("Processed data:", data);
  if (data && data.success) {
    const toast = useToast();
    toast.success('Application submitted successfully!');
    
    // Navigate to the homepage first
    this.$router.push("/successful").then(() => {
        // Delay the download to allow the navigation to complete
        setTimeout(() => {
            this.downloadPDF(data.ticketPdf, 'Event_Ticket.pdf');
        }, 4000); // Adjust the delay (in milliseconds) as needed
    });
} else {
    const toast = useToast();
    toast.error('Application failed', data ? data.message : 'No data returned');
}

  }   catch (error) {
    console.error('Error submitting application:', error);
  }

  },

  downloadPDF(base64Data, filename) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
    }
  }
};
</script>

<style scoped>
.application-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.application-form {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
}

h3 {
  color: #333;
  font-size: 1.5em;
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 1em;
  color: #333;
}

.submit-button {
  width: 100%;
  padding: 10px 0;
  background-color: lightseagreen;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #17a58b;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color: #333;
}
</style>
