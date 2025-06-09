const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    console.log('Function started, parsing request body...');
    const data = JSON.parse(event.body);
    const { name, email, phone, service, date, time, message } = data;

    console.log('Received booking data:', { name, email, phone, service, date, time });

    if (!name || !email || !phone || !service || !date || !time) {
      console.error('Missing required fields:', { name: !!name, email: !!email, phone: !!phone, service: !!service, date: !!date, time: !!time });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Faltan campos requeridos' })
      };
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.error('SendGrid API key not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'SendGrid API key not configured' })
      };
    }

    console.log('Setting up SendGrid...');
    sgMail.setApiKey(apiKey);

    // Parse date and time for Google Calendar (Buenos Aires timezone GMT-3)
    console.log('Creating calendar data...');
    const [day, month, year] = date.split('/');
    const [hours, minutes] = time.split(':');
    
    // Create date in Buenos Aires timezone (GMT-3)
    // We need to add 3 hours to compensate for the GMT-3 offset when creating UTC time
    const startDate = new Date(year, parseInt(month) - 1, day, parseInt(hours), parseInt(minutes || '0'));
    // Adjust for Buenos Aires timezone (GMT-3) - add 3 hours to get correct UTC time
    startDate.setHours(startDate.getHours() + 3);
    const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 minutes later

    // Create Google Calendar event URL (public URL that creates events with Meet)
    const eventTitle = encodeURIComponent(`Demo Gandolfo AI - ${name}`);
    const eventDescription = encodeURIComponent(`Demostración personalizada de Gandolfo AI para ${name}
    
Participante: ${name}
Email: ${email}
Teléfono: ${phone}
Servicio: ${service}
${message ? `Mensaje: ${message}` : ''}

🎯 Agenda:
• Presentación de Gandolfo AI
• Demo en vivo del sistema
• Automatización de reservas
• Integración WhatsApp
• Propuesta comercial

Soporte: gandolfo@vivacom.com.ar`);
    
    const formatForCalendar = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');
    const calendarStart = formatForCalendar(startDate);
    const calendarEnd = formatForCalendar(endDate);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${calendarStart}/${calendarEnd}&details=${eventDescription}&add=${encodeURIComponent(email)}&sf=true&output=xml`;

    console.log('Preparing emails...');

    // Create professional email content
    const businessEmail = {
      to: 'gandolfo@vivacom.com.ar',
      from: 'gandolfo@vivacom.com.ar',
      subject: `🚀 Nueva Demo Agendada - ${name} (${service})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #76ab33 0%, #3495cb 100%); padding: 24px; text-align: center;">
            <img src="https://gandolfo.netlify.app/lovable-uploads/logo_gandolfo-bco.png" alt="Gandolfo AI" style="max-width: 160px; height: auto; margin-bottom: 16px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Nueva Demo Agendada</h1>
          </div>
          
          <div style="padding: 24px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #1a73e8; margin: 0 0 16px 0;">📅 Detalles de la Reunión</h3>
              <p><strong>Fecha:</strong> ${date}</p>
              <p><strong>Hora:</strong> ${time} (GMT-3, Hora de Buenos Aires)</p>
              <p><strong>Duración:</strong> 30 minutos</p>
              <p><a href="${googleCalendarUrl}" style="background: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 8px;">📅 Agregar a Google Calendar</a></p>
            </div>
            
            <div style="background: #e8f0fe; padding: 20px; border-radius: 8px;">
              <h3 style="color: #1565c0; margin: 0 0 16px 0;">👤 Información del Cliente</h3>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Teléfono:</strong> ${phone}</p>
              <p><strong>Servicio:</strong> ${service}</p>
              ${message ? `<p><strong>Mensaje:</strong> ${message}</p>` : ''}
            </div>
          </div>
        </div>
      `
    };

    const clientEmail = {
      to: email,
      from: 'gandolfo@vivacom.com.ar',
      subject: 'Tu reunión con Gandolfo AI está confirmada - ¡Con Google Meet!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #76ab33 0%, #3495cb 100%); padding: 24px; text-align: center;">
            <img src="https://gandolfo.netlify.app/lovable-uploads/logo_gandolfo-bco.png" alt="Gandolfo AI" style="max-width: 160px; height: auto; margin-bottom: 16px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Demo Confirmada</h1>
            <p style="color: #e8f0fe; margin: 8px 0 0 0;">Tu cita con Gandolfo AI</p>
          </div>
          
          <div style="padding: 24px;">
            <h2 style="color: #333;">¡Hola ${name}!</h2>
            <p>Tu demo de Gandolfo AI ha sido confirmada. ¡Estamos emocionados de mostrarte cómo la IA puede transformar tu restaurante!</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h3 style="color: #1a73e8; margin: 0 0 16px 0;">📅 Detalles de tu Demo</h3>
              <p><strong>Fecha:</strong> ${date}</p>
              <p><strong>Hora:</strong> ${time} (GMT-3, Hora de Buenos Aires)</p>
              <p><strong>Duración:</strong> 30 minutos</p>
              <p><strong>Plataforma:</strong> Google Meet (se generará automáticamente)</p>
              
              <a href="${googleCalendarUrl}" style="background: #1a73e8; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 16px; font-weight: bold;">
                📅 Agregar a Google Calendar
              </a>
              <p style="font-size: 13px; color: #666; margin-top: 8px;">
                Al agregar el evento a tu calendario, se generará automáticamente el enlace de Google Meet
              </p>
            </div>
            
            <div style="background: #e8f0fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1565c0; margin: 0 0 12px 0;">🎯 Qué veremos en esta demo</h3>
              <ul style="color: #1565c0; margin: 0; padding-left: 20px;">
                <li>Sistema de reservas con IA conversacional</li>
                <li>Automatización de WhatsApp Business</li>
                <li>Dashboard de analytics en tiempo real</li>
                <li>Integración con sistemas existentes</li>
                <li>Propuesta comercial personalizada</li>
              </ul>
            </div>
            
            <div style="background: #fef7e0; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #f9ab00; margin: 0 0 8px 0;">💡 Consejos para la reunión</h4>
              <p style="margin: 0; color: #f9ab00; font-size: 14px;">
                • Haz clic en el botón de arriba para agregar el evento a tu calendario<br>
                • El enlace de Google Meet se generará automáticamente<br>
                • Únete 2-3 minutos antes de la hora<br>
                • Ten a mano información de tu restaurante<br>
                • Prepara preguntas sobre automatización
              </p>
            </div>
            
            <div style="border: 1px solid #ddd; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #333; margin: 0 0 12px 0;">📞 ¿Necesitas ayuda?</h4>
              <p style="margin: 0; color: #666; font-size: 14px;">
                📧 Email: <a href="mailto:gandolfo@vivacom.com.ar" style="color: #1a73e8;">gandolfo@vivacom.com.ar</a><br>
                🌐 Web: <a href="https://gandolfo.netlify.app" style="color: #1a73e8;">gandolfo.netlify.app</a>
              </p>
            </div>
            
            <p style="text-align: center; color: #666; font-size: 12px; margin-top: 30px;">
              © 2025 Gandolfo AI - Revolucionando restaurantes con IA<br>
              <a href="https://gandolfo.netlify.app" style="color: #1a73e8;">gandolfo.netlify.app</a>
            </p>
          </div>
        </div>
      `
    };

    console.log('Sending emails...');
    
    // Send emails
    await Promise.all([
      sgMail.send(businessEmail),
      sgMail.send(clientEmail)
    ]);

    console.log('Emails sent successfully!');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Emails enviados correctamente con integración de Google Calendar',
        calendarUrl: googleCalendarUrl
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    console.error('Error stack:', error.stack);
    
    // Check if it's a SendGrid error
    if (error.response && error.response.body) {
      console.error('SendGrid error details:', error.response.body);
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error enviando emails', 
        details: error.message,
        type: error.name || 'Unknown error'
      })
    };
  }
};