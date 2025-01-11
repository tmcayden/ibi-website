// supabase/functions/sendEmail.js

export const handler = async (event) => {
  try {
    const { template, data, to, subject } = JSON.parse(event.body)

    // Validate required fields
    if (!to || !template || !data || !subject) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      }
    }

    // SendGrid API URL and API Key
    const sendGridApiKey = 'YOUR_SENDGRID_API_KEY'
    const sendGridApiUrl = 'https://api.sendgrid.com/v3/mail/send'

    const emailBody = {
      personalizations: [
        {
          to: [{ email: to }],
          subject: subject
        }
      ],
      from: { email: 'no-reply@yourdomain.com' },
      content: [
        {
          type: 'text/html',
          value: renderTemplate(template, data) // This function will replace variables in your HTML template
        }
      ]
    }

    // Send email using fetch and SendGrid API
    const response = await fetch(sendGridApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sendGridApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailBody)
    })

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully!' })
      }
    } else {
      const error = await response.json()
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error sending email', error })
      }
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error: error.message })
    }
  }
}

// Helper function to render the template with data
function renderTemplate(templateName, data) {
  // Load your template and replace placeholders with data
  const template = `<html><body>
    <h1>Hello ${data.user_name},</h1>
    <p>We have received your request. We'll contact you shortly at ${data.user_email} or ${data.user_phone}</p>
    <footer>This email was sent automatically from the form on https://yourwebsite.com</footer>
  </body></html>`
  return template
}
