import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { Channel } from '../../interfaces/channel';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '../../channels/service/channel.service';
import { UserService } from '../../users/service/user.service';
import axios from 'axios';
import { API_BASE_URL } from '../../config/config';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css'
})
export class ListPostsComponent {
  userName: string = '';
  user: User[] = [];



  channel: Channel = {
    id: 0, name: '', deletable: false, posts: [],
    idUser: 0
  };
  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const channelId = +params['id'];

      this.channelService.fetchDataChannelById(channelId).then(() => {
        this.channel = this.channelService.getChannel();
        // console.log("channel : ", this.channel)

      });
    });
    const userId = 1;

    this.userService.getUser(userId)
      .then(user => {
        this.user = [user];
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

  }





  onDeleteChannel(id: number, nameChannel: string) {

    let conf = confirm(`Etes-vous sûr de vouloir supprimer ${nameChannel} ?`);

    if (conf)
      axios.delete(`${API_BASE_URL}/channels/${id}`)
        .then(() => {
          console.log("Canal supprimé avec succès!");
          this.router.navigate(['/channels/1']);

        })
        .catch(error => {
          console.error("Erreur lors de la suppression de la client:", error);
        });
  }




  onDeletePost(id: number, message: string) {
    console.log(id)
    let conf = confirm(`Etes-vous sûr de vouloir supprimer ${message} ?`);

    if (conf)
      axios.delete(`${API_BASE_URL}/post/${id}`)
        .then(() => {
          console.log("Post supprimé avec succès!");
          location.reload();
        })
        .catch(error => {
          console.error("Erreur lors de la suppression de la client:", error);
        });
  }


}