import { NgModule } from '@angular/core';
import { BrowserModule ,Title} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
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
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { EmailComponent } from './email/email.component';
import { PhoneComponent } from './phone/phone.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor.interceptor';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WelcomeLetterComponent } from './welcome-letter/welcome-letter.component';
import { SelfHelpGuideComponent } from './self-help-guide/self-help-guide.component';
import { ReviewLegalResourcesComponent } from './review-legal-resources/review-legal-resources.component';
import { CompleteConsultComponent } from './complete-consult/complete-consult.component';
import { ServicesComponent } from './services/services.component';
import { CompleteComponent } from './complete/complete.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { SummaryProfileComponent } from './summary-profile/summary-profile.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { CirComponent } from './cir/cir.component';
import { UpdateMembershipComponent } from './update-membership/update-membership.component';
import { UpdateCaseDetailComponent } from './update-case-detail/update-case-detail.component';
import { LegalPlanComponent } from './legal-plan/legal-plan.component';
import { NgxMaskModule } from 'ngx-mask'
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { FunnelComponent } from './funnel/funnel.component';
import { DobValidatorDirective } from './shared/dob-validator.directive';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { QuickstartquideComponent } from './quickstartquide/quickstartquide.component';
import { QsgProfileComponent } from './qsg-profile/qsg-profile.component';
import { QsgLegalComponent } from './qsg-legal/qsg-legal.component';
import { QsgFamilyComponent } from './qsg-family/qsg-family.component';
import { QsgPetComponent } from './qsg-pet/qsg-pet.component';
import { QsgProfessionincomeComponent } from './qsg-professionincome/qsg-professionincome.component';
import { QsgInterestsComponent } from './qsg-interests/qsg-interests.component';
import { QsgOtherlegalinterestsComponent } from './qsg-otherlegalinterests/qsg-otherlegalinterests.component';
import { QsgProfilesummaryComponent } from './qsg-profilesummary/qsg-profilesummary.component';
import { VaultStorageComponent } from './vault-storage/vault-storage.component';
import { FaqComponent } from './faq/faq.component';
import { ProfiletabsComponent } from './profiletabs/profiletabs.component';
import { SignupComponent } from './signup/signup.component';
import { EmailVerifyLaterComponent } from './email-verify-later/email-verify-later.component';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SignUpComponent,
    ProfileComponent,
    DashboardComponent,
    LegalServicesComponent,
    MemberDashboardComponent,
    AskQuestionsComponent,
    GuideChildSupportComponent,
    CompleteProfileComponent,
    LegalVaultComponent,
    CaseComponent,
    SignInComponent,
    EmailVerifyComponent,
    EmailComponent,
    PhoneComponent,
    ChangePasswordComponent,
    WelcomeLetterComponent,
    SelfHelpGuideComponent,
    ReviewLegalResourcesComponent,
    CompleteConsultComponent,
    ServicesComponent,
    CompleteComponent,
    SummaryProfileComponent,
    CirComponent,
    UpdateMembershipComponent,
    UpdateCaseDetailComponent,
    LegalPlanComponent,
	FunnelComponent,
	PrivacyPolicyComponent,
	TermsAndConditionsComponent,
  DobValidatorDirective,
  UploadDocumentComponent,
  QuickstartquideComponent,
  QsgProfileComponent,
  QsgLegalComponent,
  QsgFamilyComponent,
  QsgPetComponent,
  QsgProfessionincomeComponent,
  QsgInterestsComponent,
  QsgOtherlegalinterestsComponent,
  QsgProfilesummaryComponent,
  VaultStorageComponent,
  FaqComponent,
  ProfiletabsComponent,
  SignupComponent,
  EmailVerifyLaterComponent
  ],
  imports: [
    BrowserModule,
	NgSelectModule,
	HttpClientModule,  // ne
    AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	NgxDocViewerModule,
	FullCalendarModule,
	NgxDropzoneModule,
  CalendarModule,
	NgHttpLoaderModule.forRoot(),
	NgMultiSelectDropDownModule.forRoot(),
	 NgxMaskModule.forRoot()
  ],
  providers: [Title,
    {
	provide: HTTP_INTERCEPTORS,
	useClass: AuthInterceptor,
	multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
