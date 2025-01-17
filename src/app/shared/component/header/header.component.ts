import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/service/user.service';
import { LoginComponent } from '../../../modules/user/component/login/login.component';
import { SignupComponent } from '../../../modules/user/component/signup/signup.component';
import { GadgetType } from '../../enum/GadgetType';
import { VehicleType } from '../../enum/VehicleType';
import { ElectronicApplianceType } from '../../enum/ElectronicApplianceType';
import { FurnitureType } from '../../enum/FurnitureType';
import { MatIconModule } from '@angular/material/icon';
import { SportType } from '../../enum/SportType';
import { PetType } from '../../enum/PetType';
import { FashionType } from '../../enum/FashionType';
import { BookType } from '../../enum/BookType';
import { PropertyType } from '../../enum/PropertyType';
import { JobType } from '../../enum/JobType';
import { CommercialServiceType } from '../../enum/CommercialServiceType';
import { Location } from '@angular/common';
import { AdminDashboardService } from 'src/app/modules/admin/service/admin-dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchQuery: string = '';
  locationSearchQuery: string = '';
  searchResults: any[] = [];
  allItems: any[] = [];

  expandIconVisible: boolean = true;
  vehicleTypes = VehicleType;
  gadgetsTypes = GadgetType;
  ElectronicAppliancesTypes = ElectronicApplianceType;
  furnitureTypes = FurnitureType;
  sportTypes = SportType;
  petTypes = PetType;
  fashionTypes  = FashionType;
  bookTypes = BookType;
  propertyTypes = PropertyType;
  jobTypes = JobType;
  commercialServicTypes = CommercialServiceType;
  isUserLogedIn: boolean = false;
  userData: any;
  imageUrl: string = "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg";
  dialogRef: MatDialogRef<any> | null = null;
  isAdmin : boolean = false;
  constructor(private dialog: MatDialog, private router: Router, private userService: UserService, private location: Location, private AdminDashboardService: AdminDashboardService, private snackBar: MatSnackBar) {
    this.userService.getData().subscribe(data => {
      var role = localStorage.getItem("role");
      if(role != null && role == 'Admin')
        this.isAdmin = true;
      else
        this.isAdmin = false;
    })
   }

   hideSecondNav = false;

   // Function to handle the scroll event
   @HostListener('window:scroll', [])
   onWindowScroll() {
     const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
     // Adjust the value (e.g., 200) based on when you want the effect to trigger
     this.hideSecondNav = scrollPosition > 0;
   }

   reloadApp() {
    // Navigate to the root route (you can replace this with your desired route)
    this.router.navigate(['/']);
    
    // Trigger a hard reload of the application
    this.location.replaceState('/');
    window.location.reload();
  }

   generateGadgetsLink(subCategory?: GadgetType) {
    if (subCategory) {
      return '/Gadgets/view-posts?type=Gadget&sub=' + subCategory;
    } else {
      return '/Gadgets/view-posts?type=Gadget';
    }
  }

  generateQueryParams() {
    const queryParams = {
      type: 'Gadget',
      sub: [this.gadgetsTypes.Mobiles, this.gadgetsTypes.Tablets, this.gadgetsTypes.Accessories]
    };

    return queryParams;
  }


  clearSearchText(): void {
    this.searchQuery = '';
  }

  clearLocationSearchText(): void {
    this.locationSearchQuery = ''; 
  }

  getAllItems(): void{
    this.AdminDashboardService.getAllItems().subscribe(
      (allItems: any[]) => {
        this.allItems = allItems;
      },
      (error) => {
      }
    );
  }

  search(): void {
    if ((this.searchQuery && this.searchQuery.length >= 3) || (this.locationSearchQuery && this.locationSearchQuery.length >= 3)) {
      this.AdminDashboardService.searchAds(this.searchQuery, this.locationSearchQuery).subscribe(
        (results: any[]) => {
          this.searchResults = results;
        },
        (error) => {
        }
      );
    } else {
      this.showNotification('Search query should have at least 3 characters');
    }
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  ngOnInit() {
    if (localStorage.getItem("authToken") != null) {
      this.isUserLogedIn = true;
      this.getUserData();
    }
    this.userService.getData().subscribe(data => {
      this.getUserData();
    });
    var role = localStorage.getItem("role");
    if(role != null && role == 'Admin')
      this.isAdmin = true;
    else
      this.isAdmin = false;
  }



  openLoginModal() {

    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(LoginComponent, { width: '500px' });

    this.dialogRef.afterClosed().subscribe(result => {
      if (localStorage.getItem("authToken") != null)
        this.isUserLogedIn = true;
    });
  }
  openSignUpModal() {

    if (this.dialogRef) {
      this.dialogRef.close();
    }

    this.dialogRef = this.dialog.open(SignupComponent, { width: '500px' });

    this.dialogRef.afterClosed().subscribe(result => {
      this.isUserLogedIn = false;
    });
  }
  logout() {
    if (localStorage.getItem("authToken") != null) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      localStorage.removeItem("userId");
      this.isUserLogedIn = false;
      this.router.navigate(['/']);
    }
  }
  getUserData() {
    if (localStorage.getItem("id") != null) {
      this.userService.getUserById(Number(localStorage.getItem("id"))).subscribe((userData: any) => {
        this.userData = userData[0];
        if (this.userData.userImageList.length > 0) {
          this.imageUrl = this.userData.userImageList[this.userData.userImageList.length - 1].imageURL;
        }
      });
    }
  }

  
  toggleExpandIcons(): void {
    this.expandIconVisible = !this.expandIconVisible;
  }
  postAdd() {
    if (localStorage.getItem('id') != null)
      this.router.navigate(['/post-menu']);
    else
      this.openLoginModal();
  }
}
