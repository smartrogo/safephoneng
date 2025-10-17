import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Privacy Policy Dialog Component
 * Displays the SafePhone NG privacy policy aligned with Nigerian Data Protection Regulation (NDPR)
 */
export const PrivacyPolicyDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Privacy Policy & Data Protection</DialogTitle>
          <DialogDescription>
            SafePhone NG - Compliant with Nigeria Data Protection Regulation (NDPR)
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            {/* Introduction */}
            <section>
              <h3 className="font-semibold text-base mb-2">1. Introduction</h3>
              <p className="text-muted-foreground">
                SafePhone NG ("we", "our", or "us") is committed to protecting your personal data in accordance with the Nigeria Data Protection Regulation (NDPR) 2019. This privacy policy explains how we collect, use, store, and protect your information when you use our phone registration and anti-theft service.
              </p>
            </section>

            {/* Data Controller */}
            <section>
              <h3 className="font-semibold text-base mb-2">2. Data Controller</h3>
              <p className="text-muted-foreground">
                SafePhone NG is the data controller responsible for your personal data. For any data protection concerns, please contact us through our official channels.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h3 className="font-semibold text-base mb-2">3. Information We Collect</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li><strong>Personal Information:</strong> Name, email address, phone number</li>
                <li><strong>Device Information:</strong> IMEI number, device make, model, and serial number</li>
                <li><strong>Wallet Information:</strong> Blockchain wallet address (if using MetaMask)</li>
                <li><strong>Location Data:</strong> Device location when reporting theft (with your consent)</li>
                <li><strong>Transaction Data:</strong> Registration and verification records stored on blockchain</li>
              </ul>
            </section>

            {/* Legal Basis for Processing */}
            <section>
              <h3 className="font-semibold text-base mb-2">4. Legal Basis for Processing</h3>
              <p className="text-muted-foreground">
                We process your personal data based on:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-2">
                <li><strong>Consent:</strong> You provide explicit consent when registering on our platform</li>
                <li><strong>Contractual Necessity:</strong> To provide our phone registration and tracking services</li>
                <li><strong>Legal Obligation:</strong> To comply with Nigerian law enforcement requirements for stolen device reporting</li>
                <li><strong>Legitimate Interest:</strong> To prevent fraud and protect device ownership rights</li>
              </ul>
            </section>

            {/* How We Use Your Data */}
            <section>
              <h3 className="font-semibold text-base mb-2">5. How We Use Your Data</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Register and verify device ownership</li>
                <li>Store immutable records on blockchain for authenticity</li>
                <li>Process theft reports and assist in device recovery</li>
                <li>Verify device legitimacy for potential buyers</li>
                <li>Communicate important updates about your registered devices</li>
                <li>Comply with legal obligations and law enforcement requests</li>
              </ul>
            </section>

            {/* Data Storage and Security */}
            <section>
              <h3 className="font-semibold text-base mb-2">6. Data Storage and Security</h3>
              <p className="text-muted-foreground mb-2">
                We implement appropriate technical and organizational measures to protect your data:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Encryption of data in transit and at rest</li>
                <li>Blockchain technology for tamper-proof records</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Data stored within Nigeria or in jurisdictions with adequate data protection</li>
              </ul>
            </section>

            {/* Your Rights Under NDPR */}
            <section>
              <h3 className="font-semibold text-base mb-2">7. Your Rights Under NDPR</h3>
              <p className="text-muted-foreground mb-2">You have the following rights:</p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li><strong>Right to Access:</strong> Request access to your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with Nigeria Data Protection Bureau (NDPB)</li>
              </ul>
            </section>

            {/* Data Sharing and Disclosure */}
            <section>
              <h3 className="font-semibold text-base mb-2">8. Data Sharing and Disclosure</h3>
              <p className="text-muted-foreground mb-2">We may share your data with:</p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Law enforcement agencies when legally required</li>
                <li>Authorized third parties for device verification purposes</li>
                <li>Service providers who assist in operating our platform (under strict confidentiality agreements)</li>
              </ul>
              <p className="text-muted-foreground mt-2">
                We will never sell your personal data to third parties.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h3 className="font-semibold text-base mb-2">9. Data Retention</h3>
              <p className="text-muted-foreground">
                We retain your personal data for as long as necessary to provide our services and comply with legal obligations. Device registration records on blockchain are permanent and immutable by design. Other personal data may be deleted upon request, subject to legal requirements.
              </p>
            </section>

            {/* Blockchain Considerations */}
            <section>
              <h3 className="font-semibold text-base mb-2">10. Blockchain Technology</h3>
              <p className="text-muted-foreground">
                Device registration data stored on blockchain is permanent and cannot be altered or deleted. This ensures the integrity of ownership records. Only essential device information (IMEI, registration hash) is stored on-chain, while personal details remain in our secure database.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h3 className="font-semibold text-base mb-2">11. Children's Privacy</h3>
              <p className="text-muted-foreground">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal data from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h3 className="font-semibold text-base mb-2">12. Changes to This Privacy Policy</h3>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our platform and updating the "Last Updated" date.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h3 className="font-semibold text-base mb-2">13. Contact Us</h3>
              <p className="text-muted-foreground mb-2">
                For any questions, concerns, or to exercise your data protection rights, please contact us:
              </p>
              <ul className="list-none space-y-1 text-muted-foreground">
                <li><strong>Email:</strong> privacy@safephoneng.com</li>
                <li><strong>Address:</strong> SafePhone NG Data Protection Office, Lagos, Nigeria</li>
              </ul>
            </section>

            {/* NDPR Compliance */}
            <section>
              <h3 className="font-semibold text-base mb-2">14. NDPR Compliance</h3>
              <p className="text-muted-foreground">
                SafePhone NG is committed to full compliance with the Nigeria Data Protection Regulation (NDPR) 2019 and works under the supervision of the Nigeria Data Protection Bureau (NDPB). We conduct regular data protection impact assessments and maintain appropriate data processing records as required by law.
              </p>
            </section>

            {/* Last Updated */}
            <section className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Last Updated:</strong> January 2025
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Version:</strong> 1.0
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
