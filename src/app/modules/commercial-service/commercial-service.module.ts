import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './component/add-post/add-post.component';
import { CommercialServicePostsComponent } from './component/commercial-service-posts/commercial-service-posts.component';
import { CommercialServiceFilterComponent } from './component/commercial-service-filter/commercial-service-filter.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { CommercialServiceRoutingModule } from './commercial-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AddPostComponent,
    CommercialServicePostsComponent,
    CommercialServiceFilterComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    CommercialServiceRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSliderModule,
  ]
})
export class CommercialServiceModule { }
