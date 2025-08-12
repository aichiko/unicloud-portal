import { Divider } from "antd";
import DateTimeComponent from "../common/DateTimeComponent";
import InformListItem from "../common/InformListItem";

type ItemModel = AcademicPolicyModel | PortalPolicyModel | PortalNewsModel;

interface ServiceListItemProps {
  itemModel: ItemModel;
  firstItem?: boolean;
  onClick?: () => void;
}


function ServiceListItem({ itemModel, firstItem, onClick }: ServiceListItemProps) {
  return (
    <div className="flex flex-row justify-between items-center p-4 
    gap-4 h-32 hover:bg-[#F5F5F5] cursor-pointer" onClick={onClick}>
      <DateTimeComponent dateString={itemModel.createTime} dateFormat="YYYY-MM-DD HH:mm:ss" />
      <div className="flex-1 border-b border-[#DCDCDC]">
      <InformListItem title={itemModel.title} content={itemModel.content} firstItem={firstItem} />
      </div>
    </div>
  );
}


export default ServiceListItem;