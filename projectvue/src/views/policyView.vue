<template>
<!-- Privacy Policy Section -->
<div class="privacy-policy-container">
    <h3>Privacy Policy</h3>
    <p>
        At <strong>ARU Event system</strong>, your privacy is important to us. This Privacy Policy outlines the types of personal
        information we collect, how we use it, and how we protect your data.
    </p>

    <h4>1. Information We Collect</h4>
    <ul>
        <li><strong>Personal Identification Information</strong>: such as name, email address</li>
        <li><strong>Usage Data</strong>: such as IP address, browser type, and interaction with our application.</li>
        <li><strong>Cookies</strong>: small files stored on your device to improve your experience on our site.</li>
    </ul>

    <h4>2. How We Use Your Information</h4>
    <p>
        We may use the information we collect to:
    </p>
    <ul>
        <li>Provide and improve our services.</li>
        <li>Respond to your inquiries or customer service requests.</li>
        <li>Send you relevant updates or promotions, if you have opted in.</li>
        <li>Ensure security and detect/prevent fraud.</li>
    </ul>

    <h4>3. Data Protection</h4>
    <p>
        We implement security measures to protect your personal information from unauthorized access, alteration, disclosure, 
        or destruction. However, please note that no method of transmission over the internet is 100% secure.
    </p>

    <h4>4. Third-Party Services</h4>
    <p>
        We may share your information with trusted third-party services that assist in operating our application or conducting our 
        business, provided that they agree to keep your information confidential.
    </p>

    <h4>5. Your Rights</h4>
    <p>You have the right to:</p>
    <ul>
        <li>Access, update, or delete your personal information.</li>
        <li>Withdraw your consent for us to process your data.</li>
        <li>Request that we stop sending you marketing communications.</li>
    </ul>

    <h4>6. Changes to Our Privacy Policy</h4>
    <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
    </p>

    <p>
        If you have any questions or concerns about our Privacy Policy, please contact us at <strong>aru@ac.tz, limbureubenn@gmail.com, +255625219727, +255658907176</strong>.<br><br>
    </p>
</div>
<FooterPage />
</template>
<style scoped>
.privacy-policy-container {
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 8px;
    max-width: 800px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.privacy-policy-container h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
}

.privacy-policy-container h4 {
    font-size: 1.25rem;
    color: #0056b3;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
}

.privacy-policy-container p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
}

.privacy-policy-container ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
}

.privacy-policy-container ul li {
    margin-bottom: 0.5rem;
}

.privacy-policy-container strong {
    color: #000;
}

</style>
<script>
import FooterPage from '@/components/FooterPage.vue';

export default {
    name: 'PolicyView',
    components: {
        FooterPage
    }
}
</script>