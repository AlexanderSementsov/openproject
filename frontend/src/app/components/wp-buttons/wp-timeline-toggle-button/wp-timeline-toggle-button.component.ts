// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
// ++

import {WorkPackageTableTimelineService} from '../../wp-fast-table/state/wp-table-timeline.service';
import {AbstractWorkPackageButtonComponent, ButtonControllerText} from '../wp-buttons.module';
import {Component} from '@angular/core';
import {I18nService} from 'core-app/modules/common/i18n/i18n.service';
import {TimelineZoomLevel} from 'core-app/modules/hal/resources/query-resource';

export interface TimelineButtonText extends ButtonControllerText {
  zoomOut:string;
  zoomIn:string;
  zoomAuto:string;
}

@Component({
  templateUrl: './wp-timeline-toggle-button.html',
  selector: 'wp-timeline-toggle-button',
})
export class WorkPackageTimelineButtonComponent extends AbstractWorkPackageButtonComponent  {
  public buttonId:string = 'work-packages-timeline-toggle-button';
  public iconClass:string = 'icon-view-timeline';

  private activateLabel:string;
  private deactivateLabel:string;

  public text:TimelineButtonText;

  public minZoomLevel:TimelineZoomLevel = 'days';
  public maxZoomLevel:TimelineZoomLevel = 'years';

  constructor(readonly I18n:I18nService,
              public wpTableTimeline:WorkPackageTableTimelineService) {
    super(I18n);

    this.activateLabel = I18n.t('js.timelines.button_activate');
    this.deactivateLabel = I18n.t('js.timelines.button_deactivate');


    this.text.zoomIn = I18n.t('js.timelines.zoom.in');
    this.text.zoomOut = I18n.t('js.timelines.zoom.out');
    this.text.zoomAuto = I18n.t('js.timelines.zoom.auto');
  }

  public get label():string {
    if (this.isActive()) {
      return this.deactivateLabel;
    } else {
      return this.activateLabel;
    }
  }

  public isToggle():boolean {
    return true;
  }

  public isActive():boolean {
    return this.wpTableTimeline.isVisible;
  }

  public get isAutoZoom() {
    return this.wpTableTimeline.isAutoZoom();
  }

  public updateZoomWithDelta(delta:number) {
    this.wpTableTimeline.updateZoomWithDelta(delta);
  }

  public get currentZoom() {
    return this.wpTableTimeline.zoomLevel;
  }

  public performAction(event:Event) {
    this.toggleTimeline();
  }

  public toggleTimeline() {
    this.wpTableTimeline.toggle();
  }

  public enableAutoZoom() {
    this.wpTableTimeline.enableAutozoom();
  }

  public getAutoZoomToggleClass():string {
    return this.isAutoZoom ? '-disabled' : '';
  }
}
