'use client';
import './../../styles/form.scss';
import Button from "@/components/Button/Button";
import useContractForm from "@/features/contact/useContactForm";
import {useState} from "react";
import {ContactFormStatus} from "@/types/contactForm.types";
import Loader from "@/components/Loader/Loader";
import Alert from "@/components/Alert/Alert";

const defaultFormStatus: ContactFormStatus = {isLoading: false, isError: false, isSuccess: false};

export  default function Contact() {
    const contactFormContract = useContractForm();
    const [contactFormStatus, setContactFormStatus] = useState<ContactFormStatus>(defaultFormStatus);
    const messages = {
        success: 'Thank you! Your message was successfully sent. I will do my best to get back to you as soon as possible!',
        error: 'Sorry, error happened when sending your message. Please try again later or contact me via <a target="_blank" href="https://www.linkedin.com/in/lala-hakobyan-71aa64b8/">Linkedin.</a>'
    }

    const submitForm = async () => {
        setContactFormStatus({...defaultFormStatus, ...{isLoading: true}});
        try{
            const response = await fetch('api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactFormContract.contactFormState.form)
            })

            contactFormContract.resetForm();

            if(response.ok) {
                setContactFormStatus({...contactFormStatus, ...{isSuccess: true, isLoading: false}})
            } else {
                setContactFormStatus({...contactFormStatus, ...{isError: true, isLoading: false}})
            }
        } catch {
            setContactFormStatus({...contactFormStatus, ...{isError: true, isLoading: false}})
        }
    }

    return (
        <>
            {contactFormStatus.isLoading && <Loader></Loader>}

            <form className="form">
                <div className="formGroup">
                    <label className="formGroup__label formGroup__label--required" htmlFor="nameField">Name</label>
                    <input type="text"
                           className={contactFormContract.isNameError ? 'formGroup__formControl formGroup__formControl--error' : 'formGroup__formControl'}
                           id="nameField"
                           value={contactFormContract.contactFormState.form.name}
                           onChange={contactFormContract.handleFieldChange('name')}
                           onBlur={contactFormContract.handleFieldBlur('name')}
                           name="name" />
                    {contactFormContract.isNameError &&
                        <span className="formGroup__errorMessage">{contactFormContract.contactFormState.errors.name}</span>
                    }
                </div>
                <div className="formGroup">
                    <label className="formGroup__label formGroup__label--required" htmlFor="emailField">Email</label>
                    <input type="text"
                           className={contactFormContract.isEmailError ? 'formGroup__formControl formGroup__formControl--error' : 'formGroup__formControl'}
                           id="emailField"
                           value={contactFormContract.contactFormState.form.email}
                           onChange={contactFormContract.handleFieldChange('email')}
                           onBlur={contactFormContract.handleFieldBlur('email')}
                           name="email" />
                    {contactFormContract.isEmailError &&
                        <span className="formGroup__errorMessage">{contactFormContract.contactFormState.errors.email}</span>
                    }
                </div>
                <div className="formGroup">
                    <label className="formGroup__label" htmlFor="subjectField">Subject</label>
                    <input type="text"
                           className="formGroup__formControl"
                           value={contactFormContract.contactFormState.form.subject}
                           onChange={contactFormContract.handleFieldChange('subject')}
                           onBlur={contactFormContract.handleFieldBlur('subject')}
                           id="subjectField"
                           name="subject" />
                </div>
                <div className="formGroup">
                    <label className="formGroup__label formGroup__label--required" htmlFor="messageField">Message</label>
                    <textarea className={contactFormContract.isMessageError ? 'formGroup__formControl formGroup__formControl--error' : 'formGroup__formControl'}
                              value={contactFormContract.contactFormState.form.message}
                              onChange={contactFormContract.handleFieldChange('message')}
                              onBlur={contactFormContract.handleFieldBlur('message')}
                              id="messageField"
                              name="message">
                    </textarea>
                    {contactFormContract.isMessageError &&
                        <span className="formGroup__errorMessage">{contactFormContract.contactFormState.errors.message}</span>
                    }
                </div>
                <div className="text-center">
                    {contactFormStatus.isSuccess && <Alert alert={{type: 'success'}}><p>{messages.success}</p></Alert>}

                    {contactFormStatus.isError && <Alert alert={{type: 'danger'}}><p dangerouslySetInnerHTML={{ __html: messages.error as TrustedHTML}}></p></Alert>}

                    {!contactFormStatus.isSuccess && !contactFormStatus.isError &&
                     <>
                        <Button button={{label: 'Send Message', style: 'primary', disabled: !contactFormContract.contactFormState.isValid || contactFormStatus.isLoading}} onClick={submitForm} />
                        <Button button={{label: 'Reset', style: 'ghost', className: 'ml-xs'}} onClick={contactFormContract.resetForm} />
                    </>
                    }
                </div>
            </form>
        </>
    )
}