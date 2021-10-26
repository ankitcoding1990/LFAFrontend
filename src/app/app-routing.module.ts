import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LegalServicesComponent } from './legal-services/legal-services.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { AskQuestionsComponent } from './ask-questions/ask-questions.component';
import { GuideChildSupportComponent } from './guide-child-support/guide-child-support.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { LegalVaultComponent } from './legal-vault/legal-vault.component';
import { CaseComponent } from './case/case.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { EmailComponent } from './email/email.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { EmailVerifyLaterComponent } from './email-verify-later/email-verify-later.component';
import { PhoneComponent } from './phone/phone.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WelcomeLetterComponent } from './welcome-letter/welcome-letter.component';
import { SelfHelpGuideComponent } from './self-help-guide/self-help-guide.component';
import { ReviewLegalResourcesComponent } from './review-legal-resources/review-legal-resources.component';
import { CompleteConsultComponent } from './complete-consult/complete-consult.component';
import { ServicesComponent } from './services/services.component';
import { CompleteComponent } from './complete/complete.component';
import { SummaryProfileComponent } from './summary-profile/summary-profile.component';
import { CirComponent } from './cir/cir.component';
import { UpdateMembershipComponent } from './update-membership/update-membership.component';
import { UpdateCaseDetailComponent } from './update-case-detail/update-case-detail.component';
import { LegalPlanComponent } from './legal-plan/legal-plan.component';
import { FunnelComponent } from './funnel/funnel.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { VaultStorageComponent } from './vault-storage/vault-storage.component';
import { FaqComponent } from './faq/faq.component';
import { QsgLegalComponent } from './qsg-legal/qsg-legal.component';
import { QsgProfessionincomeComponent } from './qsg-professionincome/qsg-professionincome.component';
import { QsgFamilyComponent } from './qsg-family/qsg-family.component';
import { QsgPetComponent } from './qsg-pet/qsg-pet.component';
import { QsgInterestsComponent } from './qsg-interests/qsg-interests.component';
import { QsgOtherlegalinterestsComponent } from './qsg-otherlegalinterests/qsg-otherlegalinterests.component';
import { QsgProfilesummaryComponent } from './qsg-profilesummary/qsg-profilesummary.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
	data : {
        title: 'App Dashboard '
    }
  },
  {
    path: 'vault-storage',
    component: VaultStorageComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'legal-services',
    component: LegalServicesComponent
  },
  {
    path: 'member-dashboard',
    component: MemberDashboardComponent
  },
  {
    path: 'ask-questions',
    component: AskQuestionsComponent
  },
  {
    path: 'guide/:id',
    component: GuideChildSupportComponent
  },
  {
    path: 'complete-profile',
    component: CompleteProfileComponent
  },
  {
    path: 'legal-vault',
    component: LegalVaultComponent
  },
  {
    path: 'case',
    component: CaseComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'email',
    component: EmailComponent
  },
  {
    path: 'phone',
    component: PhoneComponent
  },
  {

    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'email-verify',
    component: EmailVerifyComponent
  },
  {
    path: 'legal-plan/:id',
    component: LegalPlanComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'welcome-letter',
    component: WelcomeLetterComponent,
    // tslint:disable-next-line:indent
	data : {
        title: 'Welcome letter '
    }
  },
  {
    path: 'self-help-guide',
    component: SelfHelpGuideComponent
  },
  {
    path: 'review-legal-resources',
    component: ReviewLegalResourcesComponent
  },
  {
    path: 'complete-consult',
    component: CompleteConsultComponent
  },
  {
    path: 'services',
    component: ServicesComponent
  },
  {
    path: 'complete',
    component: CompleteComponent
  },
  {
    path: 'cir',
    component: CirComponent
  },
  {
    path: 'summary-profile',
    component: SummaryProfileComponent
  },
  {
    path: 'update-membership',
    component: UpdateMembershipComponent
  },
  {
    path: 'update-case-detail',
    component: UpdateCaseDetailComponent
  },{
    path: 'profile-funnel',
    component: FunnelComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-of-service',
    component: TermsAndConditionsComponent
  },
  {
    path: 'qsg-legal-details',
    component: QsgLegalComponent
  },
  {
    path: 'qsg-family-details',
    component: QsgFamilyComponent
  },
  {
    path: 'qsg-incomeprofession-details',
    component: QsgProfessionincomeComponent
  },
   {
    path: 'qsg-pets-details',
    component: QsgPetComponent
  },
   {
    path: 'qsg-interests-details',
    component: QsgInterestsComponent
  },
   {
    path: 'qsg-otherinterests-details',
    component: QsgOtherlegalinterestsComponent
  }, {
    path: 'qsg-profilesummary-details',
    component: QsgProfilesummaryComponent
  },
  {
    path: 'verify-email-account/:email',
    component: EmailVerifyLaterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
