def formatDetails(details):
  if details['Job'] == "Mailing List":
    return details['Email']  
  elif details['Issue'] == "This Is A Test!":
    return False
  else:
    detail_string =""" 
      Name: {0}
      Number: {1}
      Email: {2}
      Device: {3}
      Make: {4}
      Model: {5}
      Serial Number: {6}
      Issue: {7}
      Contact Prefernces: {8}
      """
    return detail_string.format(details['Name'], details['Number'], details['Email'],details['Device'], details['Make'], details['Model'], details['Serial'], details['Issue'], details['Contact Preference'])

    
def send_email(details, mailing_list):
  catch = formatDetails(details)
  if catch == False:
    return False
  else:
    from email.message import EmailMessage
    import ssl
    import smtplib
    import os
    e_sender = os.environ['COMP_SHOP_EMAIL']
    e_password = os.environ['EMAIL_PASSWORD']
    e_reciever = "computershopuk@gmail.com"
    if mailing_list == True:
      subject = "Mailing List"
    else:
      subject = "Booking Appointment"
    body = formatDetails(details)
    em = EmailMessage()
    em['From'] = e_sender
    em['To'] = e_reciever
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()
  
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(e_sender, e_password)
        smtp.sendmail(e_sender, e_reciever, em.as_string())
