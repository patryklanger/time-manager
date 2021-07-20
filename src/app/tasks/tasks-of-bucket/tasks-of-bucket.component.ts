import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tasks-of-bucket',
  templateUrl: './tasks-of-bucket.component.html',
  styleUrls: ['./tasks-of-bucket.component.scss'],
})
export class TasksOfBucketComponent implements OnInit {
  public bucketId = '';
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.bucketId = id;
    else this.router.navigateByUrl('/404');
  }
}
